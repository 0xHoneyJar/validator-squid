import * as erc1155Abi from "./abi/erc1155";
import * as erc20Abi from "./abi/erc20";
import * as erc721Abi from "./abi/erc721";
import * as uniswapAbi from "./abi/uniswap";

export enum CHAINS {
  BASE = "base",
  ARBITRUM = "arbitrum",
  OPTIMISM = "optimism",
  BERACHAIN = "berachain",
}

export enum QUESTS {
  THJ_101 = "THJ 101",
  OURS_DE_LA_RENAISSANCE = "Ours de la Renaissance",
  THE_REVENGE_OF_THE_BULLAS = "The Revenge of the Bullas",
  HENLO_6_9 = "Henlo 6/9",
  JANI_LOVE_EGGS = "Jani Love Eggs",
  RUN_IT_BACK_TURBO = "Run It Back Turbo",
  CLASS_IS_IN_SESSION = "Class Is In Session",
}

export enum QUEST_TYPES {
  ERC721_MINT = "ERC721_MINT",
  ERC1155_MINT = "ERC1155_MINT",
  ERC20_MINT = "ERC20_MINT",
  UNISWAP_SWAP = "UNISWAP_SWAP",
}

export const APICULTURE_ADDRESS = "0x6cfb9280767a3596ee6af887d900014a755ffc75";
export const BULLAS_ADDRESS = "0x98F6b7Db312dD276b9a7bD08e3937e68e662202C";
export const EGGS_ADDRESS = "0x30b8c95a6e7170a1322453b47722f10fea185b0f";
export const HOOK_ADDRESS = "0xa79dd1ca7197fe48352d75984f02cb20e259f14b";

type QuestStepConfig = {
  readonly type: string;
  readonly address: string;
  readonly eventName: string;
  readonly filterCriteria?: Record<string, any>;
  readonly requiredAmount?: number; // Make requiredAmount optional
};

type QuestConfig = {
  steps: QuestStepConfig[];
  startTime?: number; // Unix timestamp in seconds
  endTime?: number; // Unix timestamp in seconds
};

export const QUESTS_CONFIG: Record<string, Record<string, QuestConfig>> = {
  [CHAINS.BASE]: {
    [QUESTS.THE_REVENGE_OF_THE_BULLAS]: {
      steps: [
        {
          type: QUEST_TYPES.ERC1155_MINT,
          address: BULLAS_ADDRESS,
          eventName: "TransferSingle",
          filterCriteria: {
            from: "0x0000000000000000000000000000000000000000",
          },
          requiredAmount: 1,
        },
        {
          type: QUEST_TYPES.ERC1155_MINT,
          address: BULLAS_ADDRESS,
          eventName: "TransferSingle",
          filterCriteria: {
            from: "0x0000000000000000000000000000000000000000",
          },
          requiredAmount: 5,
        },
      ],
      endTime: 1721160000,
    },
    [QUESTS.JANI_LOVE_EGGS]: {
      steps: [
        {
          type: QUEST_TYPES.ERC1155_MINT,
          address: EGGS_ADDRESS,
          eventName: "TransferSingle",
          filterCriteria: {
            from: "0x0000000000000000000000000000000000000000",
          },
          requiredAmount: 1,
        },
        {
          type: QUEST_TYPES.ERC1155_MINT,
          address: EGGS_ADDRESS,
          eventName: "TransferSingle",
          filterCriteria: {
            from: "0x0000000000000000000000000000000000000000",
          },
          requiredAmount: 10,
        },
      ],
      endTime: 1722880800, // Example end time (adjust as needed)
    },
    [QUESTS.CLASS_IS_IN_SESSION]: {
      steps: [
        {
          type: QUEST_TYPES.ERC1155_MINT,
          address: HOOK_ADDRESS,
          eventName: "TransferSingle",
          filterCriteria: {
            from: "0x0000000000000000000000000000000000000000",
          },
          // requiredAmount is omitted, will default to 1
        },
      ],
      endTime: 1722103200,
    },
    [QUESTS.HENLO_6_9]: {
      steps: [
        {
          type: QUEST_TYPES.ERC1155_MINT,
          address: APICULTURE_ADDRESS,
          eventName: "TransferSingle",
          filterCriteria: {
            from: "0x0000000000000000000000000000000000000000",
          },
          // requiredAmount is omitted, will default to 1
        },
      ],
      endTime: 1718554800,
    },
    [QUESTS.OURS_DE_LA_RENAISSANCE]: {
      steps: [
        {
          type: QUEST_TYPES.ERC1155_MINT,
          address: APICULTURE_ADDRESS,
          eventName: "TransferSingle",
          filterCriteria: {
            from: "0x0000000000000000000000000000000000000000",
          },
          // requiredAmount is omitted, will default to 1
        },
      ],
      endTime: 1717690800,
    },
  },
  [CHAINS.ARBITRUM]: {
    // Add Arbitrum quests here if needed
  },
  [CHAINS.OPTIMISM]: {
    [QUESTS.THJ_101]: {
      steps: [
        {
          type: QUEST_TYPES.ERC721_MINT,
          address: "0x9bc2C48189Ff3865875E4A85AfEb6d6ba848739B",
          eventName: "Transfer",
          filterCriteria: {
            from: "0x0000000000000000000000000000000000000000",
          },
          // requiredAmount is omitted, will default to 1
        },
      ],
    },
  },
  [CHAINS.BERACHAIN]: {
    [QUESTS.RUN_IT_BACK_TURBO]: {
      steps: [
        {
          type: QUEST_TYPES.UNISWAP_SWAP,
          address: "0x8a960A6e5f224D0a88BaD10463bDAD161b68C144", // Kodiak
          eventName: "Swap",
          // requiredAmount is omitted, will default to 1
        },
        {
          type: QUEST_TYPES.ERC721_MINT,
          address: "0xBd10c70e94aCA5c0b9Eb434A62f2D8444Ec0649D", // Ticket
          eventName: "Transfer",
          filterCriteria: {
            from: "0x0000000000000000000000000000000000000000",
          },
          // requiredAmount is omitted, will default to 1
        },
      ],
      endTime: 1720461600,
    },
  },
} as const;

export const QUEST_ABIS: Record<keyof typeof QUEST_TYPES, { abi: any }> = {
  [QUEST_TYPES.ERC721_MINT]: {
    abi: erc721Abi,
  },
  [QUEST_TYPES.ERC1155_MINT]: {
    abi: erc1155Abi,
  },
  [QUEST_TYPES.ERC20_MINT]: {
    abi: erc20Abi,
  },
  [QUEST_TYPES.UNISWAP_SWAP]: {
    abi: uniswapAbi,
  },
};

export const BLOCK_RANGES = {
  [CHAINS.BASE]: {
    from: 13264923,
  },
  [CHAINS.ARBITRUM]: {
    from: 201662549,
  },
  [CHAINS.BERACHAIN]: {
    from: 607983,
  },
  [CHAINS.OPTIMISM]: {
    from: 120304396,
  },
} as const;

export const RPC_ENDPOINTS = {
  [CHAINS.BASE]: process.env.RPC_BASE_HTTP,
  [CHAINS.ARBITRUM]: process.env.RPC_ARBITRUM_ONE_HTTP,
  [CHAINS.BERACHAIN]: process.env.RPC_BERA_HTTP,
  [CHAINS.OPTIMISM]: process.env.RPC_OPTIMISM_HTTP,
} as const;

export const ARCHIVE_GATEWAYS = {
  [CHAINS.BASE]: "https://v2.archive.subsquid.io/network/base-mainnet",
  [CHAINS.ARBITRUM]: "https://v2.archive.subsquid.io/network/arbitrum-one",
  [CHAINS.BERACHAIN]: "https://v2.archive.subsquid.io/network/berachain",
  [CHAINS.OPTIMISM]: "https://v2.archive.subsquid.io/network/optimism-mainnet",
} as const;
