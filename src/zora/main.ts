import { TypeormDatabaseWithCache } from "@belopash/typeorm-store";
import { createMain } from "../common/main";
import { CHAINS } from "../constants";
import { processor } from "./processor";

processor.run(
  new TypeormDatabaseWithCache({
    stateSchema: CHAINS.ZORA,
    isolationLevel: "READ COMMITTED",
  }),
  createMain(CHAINS.ZORA)
);
