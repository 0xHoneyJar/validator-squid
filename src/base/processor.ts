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
import * as erc1155Abi from "../abi/erc1155";
import * as erc20Abi from "../abi/erc20";
import * as erc721Abi from "../abi/erc721";
import * as uniswapAbi from "../abi/uniswap";
import {
  ARCHIVE_GATEWAYS,
  BLOCK_RANGES,
  CHAINS,
  QUESTS_CONFIG,
  RPC_ENDPOINTS,
} from "../constants";

const BASE_QUEST_ADDRESSES = Object.values(QUESTS_CONFIG[CHAINS.BASE])
  .flatMap((quest) => quest.steps.map((step) => step.address.toLowerCase()))
  .filter((value, index, self) => self.indexOf(value) === index); // Remove duplicates

export const processor = new EvmBatchProcessor()
  .setGateway(ARCHIVE_GATEWAYS[CHAINS.BASE])
  .setRpcEndpoint({
    url: assertNotNull(RPC_ENDPOINTS[CHAINS.BASE], "No RPC endpoint supplied"),
    rateLimit: 10,
  })
  .setFinalityConfirmation(75)
  .setFields({
    log: {
      transactionHash: true,
    },
  })
  .setBlockRange({ from: BLOCK_RANGES[CHAINS.BASE].from })
  .addLog({
    address: BASE_QUEST_ADDRESSES,
    topic0: [
      erc20Abi.events.Transfer.topic,
      erc721Abi.events.Transfer.topic,
      erc1155Abi.events.TransferSingle.topic,
      // erc1155Abi.events.TransferBatch.topic,
      uniswapAbi.events.Swap.topic,
    ],
  });

export type Fields = EvmBatchProcessorFields<typeof processor>;
export type Context = DataHandlerContext<Store, Fields>;
export type Block = BlockHeader<Fields>;
export type Log = _Log<Fields>;
export type Transaction = _Transaction<Fields>;
