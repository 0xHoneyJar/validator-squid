import { StoreWithCache } from "@belopash/typeorm-store";
import {
  BlockHeader,
  DataHandlerContext,
  EvmBatchProcessor,
  EvmBatchProcessorFields,
  Log as _Log,
  Transaction as _Transaction,
} from "@subsquid/evm-processor";
import { assertNotNull } from "@subsquid/util-internal";
import * as rewardsVaultFactoryAbi from "../abi/berachainRewardsVaultFactory";
import * as rewardsVaultAbi from "../abi/rewardsVault";
import {
  ARCHIVE_GATEWAYS,
  BLOCK_RANGES,
  CHAINS,
  RPC_ENDPOINTS,
} from "../constants";

export function createProcessor(chain: CHAINS) {
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
      address: ["0x2B6e40f65D82A0cB98795bC7587a71bfa49fBB2B"],
      topic0: [rewardsVaultFactoryAbi.events.VaultCreated.topic],
    })
    .addLog({
      topic0: [
        rewardsVaultAbi.events.IncentiveAdded.topic,
        rewardsVaultAbi.events.IncentiveTokenRemoved.topic,
      ],
    });

  return processor;
}

export type Fields = EvmBatchProcessorFields<
  ReturnType<typeof createProcessor>
>;
export type Context = DataHandlerContext<StoreWithCache, Fields>;
export type Block = BlockHeader<Fields>;
export type Log = _Log<Fields>;
export type Transaction = _Transaction<Fields>;
export type ProcessorContext<Store> = DataHandlerContext<Store, Fields>;
