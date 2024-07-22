import { createProcessor } from "../common/processorFactory";
import { CHAINS } from "../constants";

export const processor = createProcessor(CHAINS.BASE);

export * from "../common/processorFactory";
