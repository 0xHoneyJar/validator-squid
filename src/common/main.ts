import { AbiEvent } from "@subsquid/evm-abi";
import {
  CHAINS,
  QUESTS_CONFIG,
  QUEST_TYPES,
  QUEST_TYPE_INFO,
} from "../constants";
import { Quest, QuestStep, StepProgress, UserQuestProgress } from "../model";
import { Context } from "./processorFactory";

const MAX_BATCH_SIZE = 100 * 1024 * 1024; // 100 MB

export function createMain(chain: CHAINS) {
  return async (ctx: Context) => {
    const quests: Map<string, Quest> = new Map();
    const questSteps: Map<string, QuestStep> = new Map();

    // Initialize quests and quest steps
    initializeQuestsAndSteps(chain, quests, questSteps);

    const questsArray = Array.from(quests.values());
    const questStepsArray = Array.from(questSteps.values());

    // Process blocks in smaller batches
    for (
      let batchStart = 0;
      batchStart < ctx.blocks.length;
      batchStart += MAX_BATCH_SIZE
    ) {
      const batchEnd = Math.min(batchStart + MAX_BATCH_SIZE, ctx.blocks.length);
      const batch = ctx.blocks.slice(batchStart, batchEnd);

      console.log(`Processing batch: ${batchStart} to ${batchEnd - 1}`);

      await processBatch(ctx, batch, questsArray, questStepsArray);
    }

    // Save all entities at once after processing
    await ctx.store.save(questsArray);
    await ctx.store.save(questStepsArray);
  };
}

function initializeQuestsAndSteps(
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
      quest.steps.push(questStep);
      questSteps.set(stepId, questStep);
    });

    quests.set(questName, quest);
  }
}

async function processBatch(
  ctx: Context,
  batch: typeof ctx.blocks,
  questsArray: Quest[],
  questStepsArray: QuestStep[]
) {
  const userProgressUpdates: Map<
    string,
    { quest: Quest; step: QuestStep; amount: bigint }
  > = new Map();

  for (let block of batch) {
    const currentTimestamp = Math.floor(block.header.timestamp / 1000);

    for (let log of block.logs) {
      const logAddress = log.address.toLowerCase();
      console.log(`Processing log for address: ${logAddress}`);

      const matchingQuests = questsArray.filter(
        (quest) =>
          quest.steps.some((step) => step.address === logAddress) &&
          (!quest.startTime || currentTimestamp >= quest.startTime) &&
          (!quest.endTime || currentTimestamp <= quest.endTime)
      );

      console.log(
        `Matching quests: ${matchingQuests.map((q) => q.name).join(", ")}`
      );

      for (const matchingQuest of matchingQuests) {
        const matchingSteps = matchingQuest.steps.filter(
          (step) => step.address === logAddress
        );

        console.log(
          `Matching steps for quest ${matchingQuest.name}: ${matchingSteps
            .map((s) => s.stepNumber)
            .join(", ")}`
        );

        for (const matchingStep of matchingSteps) {
          const questTypeInfo =
            QUEST_TYPE_INFO[matchingStep.type as QUEST_TYPES];
          const { abi, eventName } = questTypeInfo;

          console.log(
            `Checking event ${eventName} for step ${matchingStep.stepNumber}`
          );

          if (abi.events && eventName in abi.events) {
            const event = abi.events[eventName] as AbiEvent<any>;
            if (event.is(log)) {
              console.log(
                `Event ${eventName} matched for step ${matchingStep.stepNumber}`
              );
              const decodedLog = event.decode(log);
              const sender = matchingStep.includeTransaction
                ? log.getTransaction().from
                : undefined;

              const processed = processQuestEvent(
                matchingQuest,
                matchingStep,
                decodedLog,
                userProgressUpdates,
                sender
              );

              if (processed) {
                console.log(
                  `Processed event: ${eventName} for quest: ${matchingQuest.name}, step: ${matchingStep.stepNumber}`
                );
              } else {
                console.log(
                  `Failed to process event: ${eventName} for quest: ${matchingQuest.name}, step: ${matchingStep.stepNumber}`
                );
              }
            } else {
              console.log(
                `Event ${eventName} did not match for step ${matchingStep.stepNumber}`
              );
            }
          } else {
            console.log(
              `Event ${eventName} not found in ABI for step ${matchingStep.stepNumber}`
            );
          }
        }
      }
    }
  }

  // Apply all user progress updates at once
  for (const [userAddress, update] of userProgressUpdates) {
    await updateUserQuestProgress(
      ctx,
      userAddress,
      update.quest,
      update.step,
      update.amount
    );
  }
}

function processQuestEvent(
  quest: Quest,
  step: QuestStep,
  decodedLog: any,
  userProgressUpdates: Map<
    string,
    { quest: Quest; step: QuestStep; amount: bigint }
  >,
  sender?: string
): boolean {
  console.log(
    `Processing event for quest: ${quest.name}, step: ${step.stepNumber}`
  );
  console.log(
    `Decoded log:`,
    JSON.stringify(decodedLog, (_, v) =>
      typeof v === "bigint" ? v.toString() : v
    )
  );

  if (step.filterCriteria) {
    for (const [key, value] of Object.entries(step.filterCriteria)) {
      let logValue = decodedLog[key];
      let criteriaValue = value;

      // Convert BigInt to string for comparison
      if (typeof logValue === "bigint") {
        logValue = logValue.toString();
      }
      if (typeof criteriaValue === "bigint") {
        criteriaValue = criteriaValue.toString();
      }

      if (logValue.toLowerCase() !== criteriaValue.toLowerCase()) {
        console.log(
          `Filter criteria not met for key ${key}. Expected: ${criteriaValue}, Got: ${logValue}`
        );
        return false;
      }
    }
  }

  let userAddress: string;
  let amount: bigint = 1n;

  try {
    switch (step.type) {
      case QUEST_TYPES.ERC721_MINT:
      case QUEST_TYPES.ERC20_MINT:
        userAddress = decodedLog.to.toLowerCase();
        if (step.type === QUEST_TYPES.ERC20_MINT) amount = decodedLog.value;
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
      default:
        console.log(`Unsupported quest type: ${step.type}`);
        return false;
    }

    console.log(
      `Processed event. User: ${userAddress}, Amount: ${amount.toString()}`
    );

    // Use only the userAddress as the key
    const key = userAddress;
    const existingUpdate = userProgressUpdates.get(key);
    if (existingUpdate) {
      existingUpdate.amount += amount;
    } else {
      userProgressUpdates.set(key, { quest, step, amount });
    }

    return true;
  } catch (error) {
    console.error(
      `Error processing event for quest: ${quest.name}, step: ${step.stepNumber}`,
      error
    );
    return false;
  }
}

async function updateUserQuestProgress(
  ctx: Context,
  userAddress: string,
  quest: Quest,
  completedStep: QuestStep,
  amount: bigint
) {
  // Use only the userAddress to create the userQuestProgressId
  const userQuestProgressId = `${userAddress}-${quest.id}`;
  let userQuestProgress = await ctx.store.get(
    UserQuestProgress,
    userQuestProgressId
  );

  if (!userQuestProgress) {
    userQuestProgress = new UserQuestProgress({
      id: userQuestProgressId,
      address: userAddress, // This is correct, using only the userAddress
      quest,
      completedSteps: 0,
      completed: false,
    });
    quest.totalParticipants += 1;
  }

  const stepProgressId = `${userQuestProgressId}-step-${completedStep.stepNumber}`;
  let stepProgress = await ctx.store.get(StepProgress, stepProgressId);

  if (!stepProgress) {
    stepProgress = new StepProgress({
      id: stepProgressId,
      userQuestProgress,
      stepNumber: completedStep.stepNumber,
      progressAmount: 0n,
      completed: false,
      startTimestamp: BigInt(Math.floor(Date.now() / 1000)), // Add this line
    });
  }

  stepProgress.progressAmount += amount;

  if (
    stepProgress.progressAmount >= completedStep.requiredAmount &&
    !stepProgress.completed
  ) {
    stepProgress.completed = true;
    userQuestProgress.completedSteps += 1;

    if (userQuestProgress.completedSteps === quest.steps.length) {
      userQuestProgress.completed = true;
      quest.totalCompletions += 1;
    }
  }

  // Save entities separately to avoid the "mass saving allowed only for entities of the same class" error
  await ctx.store.save(quest);
  await ctx.store.save(userQuestProgress);
  await ctx.store.save(stepProgress);
}
