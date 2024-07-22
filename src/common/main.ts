import { CHAINS, QUESTS_CONFIG, QUEST_ABIS, QUEST_TYPES } from "../constants";
import {
  Quest,
  QuestStep,
  StepProgress,
  User,
  UserQuestProgress,
} from "../model";
import { Context } from "./processorFactory";

export function createMain(chain: CHAINS) {
  return async (ctx: Context) => {
    const quests: Map<string, Quest> = new Map();
    const questSteps: Map<string, QuestStep> = new Map();

    // Initialize quests and quest steps
    for (const [questName, questConfig] of Object.entries(
      QUESTS_CONFIG[chain]
    )) {
      const quest = new Quest({ id: questName });
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
        questStep.address = stepConfig.address;
        questStep.eventName = stepConfig.eventName;
        questStep.filterCriteria = stepConfig.filterCriteria;
        questStep.requiredAmount = stepConfig.requiredAmount || 1;
        quest.steps.push(questStep);
        questSteps.set(stepId, questStep);
      });

      quests.set(questName, quest);
    }

    for (let block of ctx.blocks) {
      for (let log of block.logs) {
        const matchingQuests = Array.from(quests.values()).filter((quest) =>
          quest.steps.some(
            (step) => step.address.toLowerCase() === log.address.toLowerCase()
          )
        );

        for (const matchingQuest of matchingQuests) {
          // Check if the log is within the quest's time range
          const currentTimestamp = Math.floor(block.header.timestamp / 1000);
          if (
            (matchingQuest.startTime &&
              currentTimestamp < matchingQuest.startTime) ||
            (matchingQuest.endTime && currentTimestamp > matchingQuest.endTime)
          ) {
            console.log(
              `Log outside of quest time range for ${matchingQuest.name}`
            );
            continue;
          }

          const matchingSteps = matchingQuest.steps.filter(
            (step) => step.address.toLowerCase() === log.address.toLowerCase()
          );

          for (const matchingStep of matchingSteps) {
            console.log(
              `Processing log: ${log.address}`,
              matchingQuest.name,
              matchingStep.type
            );

            const questAbi =
              QUEST_ABIS[matchingStep.type as keyof typeof QUEST_TYPES];
            const eventName = matchingStep.eventName;

            let decodedLog;

            if (questAbi.abi.events && eventName in questAbi.abi.events) {
              decodedLog = (
                questAbi.abi.events[
                  eventName as keyof typeof questAbi.abi.events
                ] as any
              ).decode(log);
              console.log("Decoded log:", decodedLog);
            } else {
              console.log(
                `Event ${eventName} not found in questAbi.abi.events`
              );
              continue;
            }

            const processed = await handleQuestEvent(
              ctx,
              matchingQuest,
              matchingStep,
              decodedLog
            );

            if (processed) {
              console.log(
                `Processed event: ${eventName} for quest: ${matchingQuest.name}, step: ${matchingStep.stepNumber}`
              );
            }
          }
        }
      }
    }

    await ctx.store.save([...quests.values()]);
    await ctx.store.save([...questSteps.values()]);
  };
}

async function handleQuestEvent(
  ctx: Context,
  quest: Quest,
  step: QuestStep,
  decodedLog: any
): Promise<boolean> {
  if (step.filterCriteria) {
    for (const [key, value] of Object.entries(step.filterCriteria)) {
      if (decodedLog[key] !== value) {
        console.log(
          `Filter mismatch for ${key}: ${decodedLog[key]} !== ${value}`
        );
        return false;
      }
    }
  }

  let userAddress: string;
  let amount: number = 1;

  switch (step.type) {
    case QUEST_TYPES.ERC721_MINT:
      userAddress = decodedLog.to.toLowerCase();
      break;
    case QUEST_TYPES.ERC1155_MINT:
      userAddress = decodedLog.to.toLowerCase();
      amount = Number(decodedLog.amount);
      break;
    case QUEST_TYPES.ERC20_MINT:
      userAddress = decodedLog.to.toLowerCase();
      amount = Number(decodedLog.value);
      break;
    case QUEST_TYPES.UNISWAP_SWAP:
      userAddress = decodedLog.recipient.toLowerCase();
      break;
    default:
      console.log(`Unsupported quest type: ${step.type}`);
      return false;
  }

  await updateUserQuestProgress(ctx, userAddress, quest, step, amount);
  return true;
}

async function updateUserQuestProgress(
  ctx: Context,
  userAddress: string,
  quest: Quest,
  completedStep: QuestStep,
  amount: number
) {
  // Ensure the Quest is saved first
  await ctx.store.save(quest);

  let user = await ctx.store.get(User, userAddress);
  if (!user) {
    user = new User({ id: userAddress, address: userAddress });
    await ctx.store.save(user);
    console.log(`Created new user: ${userAddress}`);
  }

  let userQuestProgress = await ctx.store.get(
    UserQuestProgress,
    `${userAddress}-${quest.id}`
  );

  if (!userQuestProgress) {
    userQuestProgress = new UserQuestProgress({
      id: `${userAddress}-${quest.id}`,
      user,
      quest,
      currentStep: 0,
      completed: false,
    });
    quest.totalParticipants += 1;
    await ctx.store.save(quest);
  }

  // Save UserQuestProgress before creating StepProgress
  await ctx.store.save(userQuestProgress);

  let stepProgress = await ctx.store.get(
    StepProgress,
    `${userQuestProgress.id}-step-${completedStep.stepNumber}`
  );

  if (!stepProgress) {
    stepProgress = new StepProgress({
      id: `${userQuestProgress.id}-step-${completedStep.stepNumber}`,
      userQuestProgress,
      stepNumber: completedStep.stepNumber,
      progressAmount: 0,
    });
  }

  // Add the valid amount to progressAmount
  stepProgress.progressAmount += amount;

  if (stepProgress.progressAmount >= completedStep.requiredAmount) {
    // Mark the step as completed if it wasn't already
    if (userQuestProgress.currentStep < completedStep.stepNumber) {
      userQuestProgress.currentStep = completedStep.stepNumber;
    }

    // Check if all steps are completed
    const allStepsCompleted = quest.steps.every(async (step) => {
      const stepProgressId = `${userQuestProgress.id}-step-${step.stepNumber}`;
      const progress = await ctx.store.get(StepProgress, stepProgressId);
      return progress && progress.progressAmount >= step.requiredAmount;
    });

    if (allStepsCompleted) {
      userQuestProgress.completed = true;
      quest.totalCompletions += 1;
      await ctx.store.save(quest);
    }
  }

  await ctx.store.save(stepProgress);
  await ctx.store.save(userQuestProgress);
  console.log(`Updated UserQuestProgress: ${userAddress}-${quest.id}`);
}
