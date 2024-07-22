import { TypeormDatabase } from "@subsquid/typeorm-store";
import { createMain } from "../common/main";
import { processor } from "./processor";
import { CHAINS } from "../constants";

processor.run(new TypeormDatabase(), createMain(CHAINS.BASE));