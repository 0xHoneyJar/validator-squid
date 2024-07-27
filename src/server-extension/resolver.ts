import { Arg, Query, Resolver } from "type-graphql";
import type { EntityManager } from "typeorm";
import { UserQuestProgress } from "../model";

@Resolver()
export class CountResolver {
  constructor(private tx: () => Promise<EntityManager>) {}

  @Query(() => Number, { name: "countByQuestName" })
  async countByQuestName(@Arg("questName") questName: string): Promise<number> {
    const manager = await this.tx();
    return await manager.getRepository(UserQuestProgress).count({
      where: { quest: { name: questName } },
    });
  }
}
