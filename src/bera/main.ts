import { TypeormDatabase } from "@subsquid/typeorm-store";
import { createMain } from "../common/main";
import { CHAINS } from "../constants";
import { processor } from "./processor";

processor.run(
  new TypeormDatabase({
    stateSchema: CHAINS.BERACHAIN,
  }),
  createMain(CHAINS.BERACHAIN)
);
