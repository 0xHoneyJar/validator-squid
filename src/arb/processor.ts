import { createProcessor } from "../common/processorFactory";
import { CHAINS } from "../constants";

export const processor = createProcessor(CHAINS.ARBITRUM);

export * from "../common/processorFactory";
