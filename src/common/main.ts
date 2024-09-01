import { StoreWithCache } from "@belopash/typeorm-store";
import { AbiEvent } from "@subsquid/evm-abi";
import { BlockData } from "@subsquid/evm-processor";
import {
  CHAINS,
  QUESTS_CONFIG,
  QUEST_TYPES,
  QUEST_TYPE_INFO,
} from "../constants";
import { Quest, QuestStep, StepProgress, UserQuestProgress } from "../model";
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
  const quests: Map<string, Quest> = new Map();
  const questSteps: Map<string, QuestStep> = new Map();

  scheduleInit(chain, quests, questSteps);

  const questsArray = Array.from(quests.values());

  for (const block of ctx.blocks) {
    mapBlock(ctx, block, questsArray);
  }

  await ctx.queue.run();
}

function scheduleInit(
  chain: CHAINS,
  quests: Map<string, Quest>,
  questSteps: Map<string, QuestStep>
) {
  for (const [questName, questConfig] of Object.entries(QUESTS_CONFIG[chain])) {
    const questId = `${chain}-${questName.replace(/\s+/g, "-").toLowerCase()}`;
    const quest = new Quest({ id: questId });
    quest.name = questName;
    quest.chain = chain;
    quest.steps = [];
    quest.startTime = questConfig.startTime;
    quest.endTime = questConfig.endTime;
    quest.totalParticipants = 0;
    quest.totalCompletions = 0;

    questConfig.steps.forEach((stepConfig, index) => {
      const stepId = `${questName}-step-${index + 1}`;
      const questStep = new QuestStep({ id: stepId });
      questStep.quest = quest;
      questStep.stepNumber = index + 1;
      questStep.type = stepConfig.type;
      questStep.address = stepConfig.address.toLowerCase();
      questStep.filterCriteria = stepConfig.filterCriteria;
      questStep.requiredAmount = stepConfig.requiredAmount || 1n;
      questStep.includeTransaction = stepConfig.includeTransaction || false;
      questStep.path = stepConfig.path;
      quest.steps.push(questStep);
      questSteps.set(stepId, questStep);
    });

    quests.set(questName, quest);
  }
}

function mapBlock(ctx: MappingContext, block: BlockData, questsArray: Quest[]) {
  const currentTimestamp = Math.floor(block.header.timestamp / 1000);

  for (let log of block.logs) {
    const logAddress = log.address.toLowerCase();

    for (let log of block.logs) {
      const logAddress = log.address.toLowerCase();
      const matchingQuests = questsArray.filter(
        (quest) =>
          quest.steps.some((step) => step.address === logAddress) &&
          (!quest.startTime || currentTimestamp >= quest.startTime) &&
          (!quest.endTime || currentTimestamp <= quest.endTime)
      );

      for (const matchingQuest of matchingQuests) {
        const matchingSteps = matchingQuest.steps.filter(
          (step) => step.address === logAddress
        );

        for (const matchingStep of matchingSteps) {
          const questTypeInfo =
            QUEST_TYPE_INFO[matchingStep.type as QUEST_TYPES];
          const { abi, eventName } = questTypeInfo;

          if (abi.events && eventName in abi.events) {
            const event = abi.events[eventName] as AbiEvent<any>;
            if (event.is(log)) {
              const decodedLog = event.decode(log);
              const sender = matchingStep.includeTransaction
                ? log.getTransaction().from
                : undefined;

              handleQuestEvent(
                ctx,
                matchingQuest,
                matchingStep,
                decodedLog,
                sender
              );
            }
          }
        }
      }
    }
  }

  async function handleQuestEvent(
    ctx: MappingContext,
    quest: Quest,
    step: QuestStep,
    decodedLog: any,
    sender?: string
  ): Promise<void> {
    if (step.filterCriteria) {
      for (const [key, value] of Object.entries(step.filterCriteria)) {
        let logValue = decodedLog[key];
        let criteriaValue = value;

        if (typeof logValue === "bigint") {
          logValue = logValue.toString();
        }
        if (typeof criteriaValue === "bigint") {
          criteriaValue = criteriaValue.toString();
        }

        if (logValue.toLowerCase() !== criteriaValue.toLowerCase()) {
          return;
        }
      }
    }

    const { userAddress, amount } = getUserAddressAndAmount(
      step.type as QUEST_TYPES,
      decodedLog,
      sender
    );

    if (!userAddress) {
      return;
    }

    const userQuestProgressId = `${userAddress}-${quest.id}`;
    const stepProgressId = `${userQuestProgressId}-step-${step.stepNumber}`;

    const userQuestProgressDeferred = ctx.store.defer(
      UserQuestProgress,
      userQuestProgressId
    );
    const stepProgressDeferred = ctx.store.defer(StepProgress, stepProgressId);

    ctx.queue.add(async () => {
      const userQuestProgress = await userQuestProgressDeferred.getOrInsert(
        (id) => {
          quest.totalParticipants += 1;
          return new UserQuestProgress({
            id,
            address: userAddress,
            quest,
            completedSteps: 0,
            completed: false,
          });
        }
      );

      const stepProgress = await stepProgressDeferred.getOrInsert((id) => {
        return new StepProgress({
          id: stepProgressId,
          userQuestProgress,
          stepNumber: step.stepNumber,
          progressAmount: 0n,
          completed: false,
          startTimestamp: BigInt(Math.floor(Date.now() / 1000)),
          path: step.path,
        });
      });

      stepProgress.progressAmount += amount;

      if (
        stepProgress.progressAmount >= step.requiredAmount &&
        !stepProgress.completed
      ) {
        stepProgress.completed = true;
        userQuestProgress.completedSteps += 1;

        if (userQuestProgress.completedSteps === quest.steps.length) {
          userQuestProgress.completed = true;
          quest.totalCompletions += 1;
        }
      }

      await ctx.store.upsert(quest);
      await ctx.store.upsert(userQuestProgress);
      await ctx.store.upsert(stepProgress);
    });
  }

  function getUserAddressAndAmount(
    questType: QUEST_TYPES,
    decodedLog: any,
    sender?: string
  ): { userAddress: string | null; amount: bigint } {
    let userAddress: string | null = null;
    let amount: bigint = 1n;

    switch (questType) {
      case QUEST_TYPES.ERC721_MINT:
      case QUEST_TYPES.ERC20_MINT:
        userAddress = decodedLog.to.toLowerCase();
        if (questType === QUEST_TYPES.ERC20_MINT) amount = decodedLog.value;
        break;
      case QUEST_TYPES.UNISWAP_MINT:
        userAddress = sender?.toLowerCase() || "";
        break;
      case QUEST_TYPES.ERC1155_MINT:
        userAddress = decodedLog.to.toLowerCase();
        amount = decodedLog.amount;
        break;
      case QUEST_TYPES.UNISWAP_SWAP:
        userAddress = decodedLog.recipient.toLowerCase();
        break;
      case QUEST_TYPES.TOKENS_MINTED:
        userAddress = decodedLog.recipient.toLowerCase();
        amount = decodedLog.amount;
        break;
      case QUEST_TYPES.TOKENS_DEPOSITED:
        userAddress = decodedLog.depositor.toLowerCase();
        amount = decodedLog.depositAmount;
        break;
      case QUEST_TYPES.STAKE:
        userAddress = decodedLog.account.toLowerCase();
        break;
      case QUEST_TYPES.CLAIM_BGT_REWARD:
        userAddress = decodedLog.account.toLowerCase();
        break;
      case QUEST_TYPES.DELEGATE:
        userAddress = decodedLog.sender.toLowerCase();
        amount = decodedLog.amount;
        break;
      case QUEST_TYPES.DIRAC_DEPOSIT:
        userAddress = decodedLog.sender.toLowerCase();
        break;
      case QUEST_TYPES.MEMESWAP_DEPLOY:
        userAddress = decodedLog.deployer.toLowerCase();
        break;
      case QUEST_TYPES.FTO_DEPOSIT:
        userAddress = decodedLog.depositer.toLowerCase();
        break;
      default:
        return { userAddress: null, amount: 0n };
    }

    return { userAddress, amount };
  }
}
