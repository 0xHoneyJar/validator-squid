import { StoreWithCache } from "@belopash/typeorm-store";
import { BlockData } from "@subsquid/evm-processor";
import * as rewardsVaultAbi from "../abi/berachainRewardsVaultFactory";
import * as rewardsVaultContractAbi from "../abi/rewardsVault";
import { CHAINS } from "../constants";
import { Vault, Incentive } from "../model";
import { TaskQueue } from "../utils/queue";
import { Context, ProcessorContext } from "./processorFactory";

type MappingContext = ProcessorContext<StoreWithCache> & { queue: TaskQueue };

export function createMain(chain: CHAINS) {
  return async (ctx: Context) => {
    return await mapBlocks(
      {
        ...ctx,
        queue: new TaskQueue(),
      },
      chain
    );
  };
}

async function mapBlocks(ctx: MappingContext, chain: CHAINS) {
  for (const block of ctx.blocks) {
    await mapBlock(ctx, block);
  }

  await ctx.queue.run();
}

async function mapBlock(ctx: MappingContext, block: BlockData) {
  for (let log of block.logs) {
    if (rewardsVaultAbi.events.VaultCreated.is(log)) {
      await handleVaultCreated(ctx, log, block);
    } else if (rewardsVaultContractAbi.events.IncentiveAdded.is(log)) {
      await handleIncentiveAdded(ctx, log, block);
    } else if (rewardsVaultContractAbi.events.IncentiveTokenRemoved.is(log)) {
      await handleIncentiveRemoved(ctx, log, block);
    }
  }
}

async function handleVaultCreated(ctx: MappingContext, log: any, block: BlockData) {
  const { vault, stakingToken } = rewardsVaultAbi.events.VaultCreated.decode(log);

  const newVault = new Vault({
    id: vault.toLowerCase(),
    address: vault.toLowerCase(),
    stakingToken: stakingToken.toLowerCase(),
    createdAt: BigInt(block.header.timestamp),
  });

  await ctx.store.save(newVault);
}

async function handleIncentiveAdded(ctx: MappingContext, log: any, block: BlockData) {
  const { token, sender, amount, incentiveRate } = rewardsVaultContractAbi.events.IncentiveAdded.decode(log);
  const vaultAddress = log.address.toLowerCase();

  const incentiveId = `${vaultAddress}-${token.toLowerCase()}`;
  let incentive = await ctx.store.get(Incentive, incentiveId);

  if (!incentive) {
    incentive = new Incentive({
      id: incentiveId,
      vault: vaultAddress,
      token: token.toLowerCase(),
      active: true,
      amount: BigInt(0),
      incentiveRate: BigInt(0),
      addedAt: BigInt(block.header.timestamp),
    });
  }

  incentive.amount = BigInt(incentive.amount) + BigInt(amount);
  incentive.incentiveRate = BigInt(incentiveRate);
  incentive.active = true;

  await ctx.store.save(incentive);
}

async function handleIncentiveRemoved(ctx: MappingContext, log: any, block: BlockData) {
  const { token } = rewardsVaultContractAbi.events.IncentiveTokenRemoved.decode(log);
  const vaultAddress = log.address.toLowerCase();

  const incentiveId = `${vaultAddress}-${token.toLowerCase()}`;
  const incentive = await ctx.store.get(Incentive, incentiveId);

  if (incentive) {
    incentive.active = false;
    incentive.removedAt = BigInt(block.header.timestamp);
    await ctx.store.save(incentive);
  }
}
