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
import {
  ARCHIVE_GATEWAYS,
  BLOCK_RANGES,
  CHAINS,
  QUESTS_CONFIG,
  QUEST_TYPES,
  QUEST_TYPE_INFO,
  RPC_ENDPOINTS,
} from "../constants";

export function createProcessor(chain: CHAINS) {
  const questConfig = QUESTS_CONFIG[chain];
  const addressToTopics: Record<string, string[]> = {};

  // Collect relevant addresses and topics
  for (const quest of Object.values(questConfig)) {
    for (const step of quest.steps) {
      const address = step.address.toLowerCase();
      if (!addressToTopics[address]) {
        addressToTopics[address] = [];
      }

      const questTypeInfo = QUEST_TYPE_INFO[step.type as QUEST_TYPES];
      const topic = questTypeInfo.abi.events[questTypeInfo.eventName].topic;

      if (!addressToTopics[address].includes(topic)) {
        addressToTopics[address].push(topic);
      }
    }
  }

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
    .setBlockRange({ from: BLOCK_RANGES[chain].from });

  // Add logs for each address with its specific topics
  for (const [address, topics] of Object.entries(addressToTopics)) {
    processor.addLog({
      address: [address],
      topic0: topics,
    });
  }

  return processor;
}

export type Fields = EvmBatchProcessorFields<
  ReturnType<typeof createProcessor>
>;
export type Context = DataHandlerContext<Store, Fields>;
export type Block = BlockHeader<Fields>;
export type Log = _Log<Fields>;
export type Transaction = _Transaction<Fields>;
