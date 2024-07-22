import { CHAINS, QUESTS_CONFIG, QUEST_ABIS, QUEST_TYPES } from "../constants";
import { Quest, QuestStep, User, UserQuestProgress } from "../model";
import { Context } from "./processorFactory";

export function createMain(chain: CHAINS) {
  return async (ctx: Context) => {
    const quests: Map<string, Quest> = new Map();
    const questSteps: Map<string, QuestStep> = new Map();

    // Initialize quests and quest steps
    for (const [questName, questConfig] of Object.entries(
      QUESTS_CONFIG[chain]
    )) {
      const quest = new Quest({
        id: questName,
        name: questName,
        chain: chain,
        steps: [],
        startTime: questConfig.startTime,
        endTime: questConfig.endTime,
        totalParticipants: 0,
        totalCompletions: 0,
      });

      questConfig.steps.forEach((stepConfig, index) => {
        const stepId = `${questName}-step-${index + 1}`;
        const questStep = new QuestStep({
          id: stepId,
          quest,
          stepNumber: index + 1,
          type: stepConfig.type,
          address: stepConfig.address,
          eventName: stepConfig.eventName,
          filterCriteria: stepConfig.filterCriteria,
          requiredAmount: stepConfig.requiredAmount || 1,
          progressAmount: 0,
        });
        quest.steps.push(questStep);
        questSteps.set(stepId, questStep);
      });

      quests.set(questName, quest);
    }

    for (let block of ctx.blocks) {
      for (let log of block.logs) {
        const matchingQuest = Array.from(quests.values()).find((quest) =>
          quest.steps.some(
            (step) => step.address.toLowerCase() === log.address.toLowerCase()
          )
        );

        if (!matchingQuest) continue;

        // Check if the log is within the quest's time range
        const currentTimestamp = block.header.timestamp;
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

        const matchingStep = matchingQuest.steps.find(
          (step) => step.address.toLowerCase() === log.address.toLowerCase()
        );

        if (!matchingStep) continue;

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
          console.log(`Event ${eventName} not found in questAbi.abi.events`);
          continue;
        }

        await handleQuestEvent(ctx, matchingQuest, matchingStep, decodedLog);

        console.log(
          `Processed event: ${eventName} for quest: ${matchingQuest.name}`
        );
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
) {
  if (step.filterCriteria) {
    for (const [key, value] of Object.entries(step.filterCriteria)) {
      if (decodedLog[key] !== value) {
        console.log(
          `Filter mismatch for ${key}: ${decodedLog[key]} !== ${value}`
        );
        return;
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
      amount = Number(decodedLog.value);
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
      return;
  }

  await updateUserQuestProgress(ctx, userAddress, quest, step, amount);
}

async function updateUserQuestProgress(
  ctx: Context,
  userAddress: string,
  quest: Quest,
  completedStep: QuestStep,
  amount: number
) {
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
}
