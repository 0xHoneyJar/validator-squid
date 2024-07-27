import {
  BlockHeader,
  DataHandlerContext,
  EvmBatchProcessor,
  EvmBatchProcessorFields,
  Log as _Log,
  Transaction as _Transaction,
} from "@subsquid/evm-processor";
import { Store } from "@subsquid/typeorm-store";
import { assertNotNull } from "@subsquid/util-internal";
import * as boogaBearsAbi from "../abi/boogaBears";
import * as erc1155Abi from "../abi/erc1155";
import * as erc20Abi from "../abi/erc20";
import * as erc721Abi from "../abi/erc721";
import * as hookVaultAbi from "../abi/hookVault";
import * as uniswapAbi from "../abi/uniswap";
import {
  ARCHIVE_GATEWAYS,
  BLOCK_RANGES,
  CHAINS,
  QUESTS_CONFIG,
  RPC_ENDPOINTS,
} from "../constants";

export function createProcessor(chain: CHAINS) {
  const QUEST_ADDRESSES = Object.values(QUESTS_CONFIG[chain])
    .flatMap((quest) => quest.steps.map((step) => step.address.toLowerCase()))
    .filter((value, index, self) => self.indexOf(value) === index);

  const processor = new EvmBatchProcessor()
    .setGateway(ARCHIVE_GATEWAYS[chain])
    .setRpcEndpoint({
      url: assertNotNull(RPC_ENDPOINTS[chain], "No RPC endpoint supplied"),
    })
    .setFinalityConfirmation(75)
    .setFields({
      log: {
        transactionHash: true,
      },
    })
    .setBlockRange({ from: BLOCK_RANGES[chain].from })
    .addLog({
      address: QUEST_ADDRESSES,
      topic0: [
        erc20Abi.events.Transfer.topic,
        erc721Abi.events.Transfer.topic,
        erc1155Abi.events.TransferSingle.topic,
        uniswapAbi.events.Swap.topic,
        hookVaultAbi.events.TokensDeposited.topic,
        boogaBearsAbi.events.TokensMinted.topic,
      ],
    });

  return processor;
}

export type Fields = EvmBatchProcessorFields<
  ReturnType<typeof createProcessor>
>;
export type Context = DataHandlerContext<Store, Fields>;
export type Block = BlockHeader<Fields>;
export type Log = _Log<Fields>;
export type Transaction = _Transaction<Fields>;
