import { AbiEvent } from "@subsquid/evm-abi";
import { parseEther, zeroAddress } from "viem";
import * as bgtAbi from "./abi/bgt";
import * as boogaBearsAbi from "./abi/boogaBears";
import * as diracVaultAbi from "./abi/diracVault";
import * as erc1155Abi from "./abi/erc1155";
import * as erc20Abi from "./abi/erc20";
import * as erc721Abi from "./abi/erc721";
import * as hookVaultAbi from "./abi/hookVault";
import * as lendingPoolAbi from "./abi/lendingPool";
import * as memeswapDeployerAbi from "./abi/memeswapDeployer";
import * as rewardsVaultAbi from "./abi/rewardsVault";
import * as simplifiedUniswapAbi from "./abi/simplifiedUniswap";
import * as strategiesControllerAbi from "./abi/strategiesController";
import * as uniswapAbi from "./abi/uniswap";

const ONE_DAY_IN_SECONDS = 60 * 60 * 24;

export enum CHAINS {
  BASE = "base",
  ARBITRUM = "arbitrum",
  OPTIMISM = "optimism",
  BERACHAIN = "berachain",
  ZORA = "zora",
}

export enum QUESTS {
  HONEY_HOOKS_AND_CUTLASSES = "Honey Hooks and Cutlasses",
  HONEYCOMB_HERITAGE = "Honeycomb Heritage",
  PROOF_OF_BOOGA = "Proof of Booga",
  THJ_101 = "THJ 101",
  OURS_DE_LA_RENAISSANCE = "Ours de la Renaissance",
  THE_REVENGE_OF_THE_BULLAS = "The Revenge of the Bullas",
  HENLO_6_9 = "Henlo 6/9",
  JANI_LOVE_EGGS = "Jani Love Eggs",
  RUN_IT_BACK_TURBO = "Run It Back Turbo",
  CLASS_IS_IN_SESSION = "Class Is In Session",
  ZORB_MANIA = "Zorb Mania",
  OOGA_BOOGA_TRIBE = "Ooga Booga Tribe",
  UNION_FUR_AND_FRIENDSHIP = "Bera Union: Fur and Friendship",
  DELEGATOOOR = "Delegatooor",
  STAKOOOR = "Stakooor",
  THE_HONEY_SITE = "The Honey Site",
  BERAC_POL = "BeracPol",
  HONEY_HEIST = "Honey Heist",
  BRUUVVPRINT = "Bruuvvprint!",
  JANI_VS_POT = "Jani vs. Pot",
}

export enum MISSIONS {
  BERA_METAL_SOLID = "Bera Metal Solid",
}

export enum QUEST_TYPES {
  ERC721_MINT = "ERC721_MINT",
  ERC1155_MINT = "ERC1155_MINT",
  ERC20_MINT = "ERC20_MINT",
  UNISWAP_SWAP = "UNISWAP_SWAP",
  TOKENS_MINTED = "TOKENS_MINTED",
  TOKENS_DEPOSITED = "TOKENS_DEPOSITED",
  UNISWAP_MINT = "UNISWAP_MINT",
  DELEGATE = "DELEGATE",
  STAKE = "STAKE",
  CLAIM_BGT_REWARD = "CLAIM_BGT_REWARD",
  DIRAC_DEPOSIT = "DIRAC_DEPOSIT",
  ZERU_DEPOSIT = "ZERU_DEPOSIT",
  ZERU_BORROW = "ZERU_BORROW",
  ZERU_OPEN_POSITION = "ZERU_OPEN_POSITION",
  MEMESWAP_DEPLOY = "MEMESWAP_DEPLOY",
}

export enum MISSION_TYPES {
  ACTIVATE_BOOST = "ACTIVATE_BOOST",
  DROP_BOOST = "DROP_BOOST",
}

type AbiWithEvents = {
  events: {
    [eventName: string]: AbiEvent<any>;
  };
};

export const QUEST_TYPE_INFO: Record<
  QUEST_TYPES,
  { eventName: string; abi: AbiWithEvents }
> = {
  [QUEST_TYPES.ERC721_MINT]: {
    eventName: "Transfer",
    abi: erc721Abi,
  },
  [QUEST_TYPES.ERC1155_MINT]: {
    eventName: "TransferSingle",
    abi: erc1155Abi as AbiWithEvents,
  },
  [QUEST_TYPES.ERC20_MINT]: {
    eventName: "Transfer",
    abi: erc20Abi as AbiWithEvents,
  },
  [QUEST_TYPES.UNISWAP_SWAP]: {
    eventName: "Swap",
    abi: uniswapAbi as AbiWithEvents,
  },
  [QUEST_TYPES.TOKENS_MINTED]: {
    eventName: "TokensMinted",
    abi: boogaBearsAbi as AbiWithEvents,
  },
  [QUEST_TYPES.TOKENS_DEPOSITED]: {
    eventName: "TokensDeposited",
    abi: hookVaultAbi as AbiWithEvents,
  },
  [QUEST_TYPES.UNISWAP_MINT]: {
    eventName: "Mint",
    abi: simplifiedUniswapAbi as AbiWithEvents,
  },
  [QUEST_TYPES.DELEGATE]: {
    eventName: "ActivateBoost",
    abi: bgtAbi as AbiWithEvents,
  },
  [QUEST_TYPES.STAKE]: {
    eventName: "Staked",
    abi: rewardsVaultAbi as AbiWithEvents,
  },
  [QUEST_TYPES.CLAIM_BGT_REWARD]: {
    eventName: "RewardPaid",
    abi: rewardsVaultAbi as AbiWithEvents,
  },
  [QUEST_TYPES.DIRAC_DEPOSIT]: {
    eventName: "Deposit",
    abi: diracVaultAbi as AbiWithEvents,
  },
  [QUEST_TYPES.ZERU_DEPOSIT]: {
    eventName: "Deposit",
    abi: lendingPoolAbi as AbiWithEvents,
  },
  [QUEST_TYPES.ZERU_BORROW]: {
    eventName: "Borrow",
    abi: lendingPoolAbi as AbiWithEvents,
  },
  [QUEST_TYPES.ZERU_OPEN_POSITION]: {
    eventName: "openPositionEvent",
    abi: strategiesControllerAbi as AbiWithEvents,
  },
  [QUEST_TYPES.MEMESWAP_DEPLOY]: {
    eventName: "Deployed",
    abi: memeswapDeployerAbi as AbiWithEvents,
  },
} as const;

export const MISSION_TYPE_INFO: Record<
  MISSION_TYPES,
  { eventName: string; abi: AbiWithEvents }
> = {
  [MISSION_TYPES.ACTIVATE_BOOST]: {
    eventName: "ActivateBoost",
    abi: bgtAbi as AbiWithEvents,
  },
  [MISSION_TYPES.DROP_BOOST]: {
    eventName: "DropBoost",
    abi: bgtAbi as AbiWithEvents,
  },
};

export const APICULTURE_ADDRESS = "0x6cfb9280767a3596ee6af887d900014a755ffc75";
export const BULLAS_ADDRESS = "0x98F6b7Db312dD276b9a7bD08e3937e68e662202C";
export const EGGS_ADDRESS = "0x30b8c95a6e7170a1322453b47722f10fea185b0f";
export const HOOKED_ADDRESS = "0xa79dd1ca7197fe48352d75984f02cb20e259f14b";
export const ZORB_ADDRESS = "0x295a70b5681069f6d37ea7ce696015c3698bb2fb";
export const HOOK_VAULT_ADDRESS = "0xB39DF6BBB1Cf2B609DeE43F109caFEFF1A7CCBEa";
export const BOOGA_BEARS_ADDRESS = "0x6Ba79f573EdFE305e7Dbd79902BC69436e197834";
export const MYSTERY_BOX_ADDRESS = "0xBB7B805B257d7C76CA9435B3ffe780355E4C4B17";
export const STDV4TNT_ADDRESS = "0x355bb949d80331516Fc7F4CF81229021187d67d2";
export const KODIAK_POOL_ADDRESS = "0xF331ABFfE9cB2b966Ab4C102ee268f4e1ad8e24b";
export const BGT_ADDRESS = "0xbDa130737BDd9618301681329bF2e46A016ff9Ad";
// HONEY-WBERA Rewards Vault
export const REWARDS_VAULT_ADDRESS =
  "0xAD57d7d39a487C04a44D3522b910421888Fb9C6d";
export const THJ_VALIDATOR_ADDRESS =
  "0x40495A781095932e2FC8dccA69F5e358711Fdd41";
export const HONEY_SITE_ADDRESS = "0x491e1d15f2a78799520937c02bb03a952140ac46";
// DIRAC Vaults
export const IBGT_DIRAC_VAULT_ADDRESS =
  "0x50bd749123A06F6a951AcE3C21E6d565176dCd7A";
export const NECT_DIRAC_VAULT_ADDRESS =
  "0xd5491A22D05092BDC388af8b8b69d58c2f5cc4Bc";
export const ZERU_LENDING_POOL = "0x989C7646B7F3f351E00f3e231247993C7e8C8CA2";
export const ZERU_STRATEGIES_CONTROLLER =
  "0x744E7099cb4070f9EC4108fC6fAFe9858ac94d79";
export const HONEY_ADDRESS = "0x0E4aaF1351de4c0264C5c7056Ef3777b41BD8e03";
export const WBERA_ADDRESS = "0x7507c1dc16935B82698e4C63f2746A2fCf994dF8";

type QuestStepConfig = {
  readonly type: QUEST_TYPES;
  readonly address: string;
  readonly filterCriteria?: Record<string, any>;
  readonly requiredAmount?: bigint;
  readonly includeTransaction?: boolean;
};

type QuestConfig = {
  steps: QuestStepConfig[];
  startTime?: number;
  endTime?: number;
};

type MissionConfig = {
  address: string;
  startTime: number;
  startStreak: {
    type: MISSION_TYPES;
    filterCriteria: Record<string, any>;
  };
  endStreak: {
    type: MISSION_TYPES;
    filterCriteria: Record<string, any>;
  };
};

export const QUESTS_CONFIG: Record<string, Record<string, QuestConfig>> = {
  [CHAINS.BERACHAIN]: {
    [QUESTS.HONEY_HEIST]: {
      steps: [
        {
          type: QUEST_TYPES.ZERU_DEPOSIT,
          address: ZERU_LENDING_POOL,
          filterCriteria: {
            reserve: HONEY_ADDRESS,
          },
        },
        {
          type: QUEST_TYPES.ZERU_BORROW,
          address: ZERU_LENDING_POOL,
          filterCriteria: {
            reserve: WBERA_ADDRESS,
          },
        },
        {
          type: QUEST_TYPES.ZERU_OPEN_POSITION,
          address: ZERU_STRATEGIES_CONTROLLER,
          filterCriteria: {
            strategyId: "1", // Change this to a string
          },
        },
      ],
      startTime: 1724673600 - ONE_DAY_IN_SECONDS, // 1 day before
      endTime: 1725192000,
    },
    [QUESTS.BERAC_POL]: {
      steps: [
        {
          type: QUEST_TYPES.DIRAC_DEPOSIT,
          address: IBGT_DIRAC_VAULT_ADDRESS,
        },
        {
          type: QUEST_TYPES.DIRAC_DEPOSIT,
          address: NECT_DIRAC_VAULT_ADDRESS,
        },
      ],
      startTime: 1724367186,
      endTime: 1725480000,
    },
    [QUESTS.STAKOOOR]: {
      steps: [
        {
          type: QUEST_TYPES.STAKE,
          address: REWARDS_VAULT_ADDRESS,
        },
      ],
      startTime: 1722183600,
    },
    [QUESTS.DELEGATOOOR]: {
      steps: [
        {
          type: QUEST_TYPES.CLAIM_BGT_REWARD,
          address: REWARDS_VAULT_ADDRESS,
        },
        {
          type: QUEST_TYPES.DELEGATE,
          address: BGT_ADDRESS,
          filterCriteria: {
            validator: THJ_VALIDATOR_ADDRESS,
          },
          requiredAmount: parseEther("1"),
        },
      ],
      startTime: 1722183600,
    },
    [QUESTS.RUN_IT_BACK_TURBO]: {
      steps: [
        {
          type: QUEST_TYPES.UNISWAP_SWAP,
          address: "0x8a960A6e5f224D0a88BaD10463bDAD161b68C144",
        },
        {
          type: QUEST_TYPES.ERC721_MINT,
          address: "0xBd10c70e94aCA5c0b9Eb434A62f2D8444Ec0649D",
          filterCriteria: {
            from: "0x0000000000000000000000000000000000000000",
          },
        },
      ],
      endTime: 1720461600,
    },
    [QUESTS.UNION_FUR_AND_FRIENDSHIP]: {
      steps: [
        {
          type: QUEST_TYPES.ERC20_MINT,
          address: STDV4TNT_ADDRESS,
          filterCriteria: {
            from: zeroAddress,
          },
          requiredAmount: 1n,
        },
        {
          type: QUEST_TYPES.UNISWAP_MINT,
          address: KODIAK_POOL_ADDRESS,
          includeTransaction: true,
        },
      ],
      endTime: 1723233600,
    },
  },
  [CHAINS.BASE]: {
    [QUESTS.OOGA_BOOGA_TRIBE]: {
      steps: [
        {
          type: QUEST_TYPES.ERC1155_MINT,
          address: MYSTERY_BOX_ADDRESS,
          requiredAmount: 1n,
        },
      ],
      endTime: 1723226400,
    },
    [QUESTS.HONEY_HOOKS_AND_CUTLASSES]: {
      steps: [
        {
          type: QUEST_TYPES.TOKENS_DEPOSITED,
          address: HOOK_VAULT_ADDRESS,
          requiredAmount: parseEther("0.025"),
        },
      ],
    },
    [QUESTS.THE_REVENGE_OF_THE_BULLAS]: {
      steps: [
        {
          type: QUEST_TYPES.ERC1155_MINT,
          address: BULLAS_ADDRESS,
          filterCriteria: {
            from: zeroAddress,
          },
          requiredAmount: 1n,
        },
        {
          type: QUEST_TYPES.ERC1155_MINT,
          address: BULLAS_ADDRESS,
          filterCriteria: {
            from: zeroAddress,
          },
          requiredAmount: 5n,
        },
      ],
      endTime: 1721160000,
    },
    [QUESTS.JANI_LOVE_EGGS]: {
      steps: [
        {
          type: QUEST_TYPES.ERC1155_MINT,
          address: EGGS_ADDRESS,
          filterCriteria: {
            from: "0x0000000000000000000000000000000000000000",
          },
          requiredAmount: 1n,
        },
        {
          type: QUEST_TYPES.ERC1155_MINT,
          address: EGGS_ADDRESS,
          filterCriteria: {
            from: "0x0000000000000000000000000000000000000000",
          },
          requiredAmount: 10n,
        },
      ],
      endTime: 1722880800,
    },
    [QUESTS.CLASS_IS_IN_SESSION]: {
      steps: [
        {
          type: QUEST_TYPES.ERC1155_MINT,
          address: HOOKED_ADDRESS,
          filterCriteria: {
            from: "0x0000000000000000000000000000000000000000",
          },
        },
      ],
      endTime: 1722103200,
    },
    [QUESTS.HENLO_6_9]: {
      steps: [
        {
          type: QUEST_TYPES.ERC1155_MINT,
          address: APICULTURE_ADDRESS,
          filterCriteria: {
            from: "0x0000000000000000000000000000000000000000",
          },
        },
      ],
      endTime: 1718554800,
    },
    [QUESTS.OURS_DE_LA_RENAISSANCE]: {
      steps: [
        {
          type: QUEST_TYPES.ERC1155_MINT,
          address: APICULTURE_ADDRESS,
          filterCriteria: {
            from: "0x0000000000000000000000000000000000000000",
          },
        },
      ],
      endTime: 1717690800,
    },
  },
  [CHAINS.ARBITRUM]: {
    [QUESTS.THE_HONEY_SITE]: {
      steps: [
        {
          type: QUEST_TYPES.ERC1155_MINT,
          address: HONEY_SITE_ADDRESS,
          filterCriteria: {
            from: "0x0000000000000000000000000000000000000000",
          },
        },
      ],
      endTime: 1723917600,
    },
    [QUESTS.PROOF_OF_BOOGA]: {
      steps: [
        {
          type: QUEST_TYPES.TOKENS_MINTED,
          address: BOOGA_BEARS_ADDRESS,
          requiredAmount: 1n,
        },
      ],
    },
  },
  [CHAINS.OPTIMISM]: {
    [QUESTS.THJ_101]: {
      steps: [
        {
          type: QUEST_TYPES.ERC721_MINT,
          address: "0x9bc2C48189Ff3865875E4A85AfEb6d6ba848739B",
          filterCriteria: {
            from: "0x0000000000000000000000000000000000000000",
          },
        },
      ],
    },
  },
  [CHAINS.ZORA]: {
    [QUESTS.ZORB_MANIA]: {
      steps: [
        {
          type: QUEST_TYPES.ERC1155_MINT,
          address: ZORB_ADDRESS,
          filterCriteria: {
            from: "0x0000000000000000000000000000000000000000",
          },
          requiredAmount: 1n,
        },
        {
          type: QUEST_TYPES.ERC1155_MINT,
          address: ZORB_ADDRESS,
          filterCriteria: {
            from: "0x0000000000000000000000000000000000000000",
          },
          requiredAmount: 3n,
        },
      ],
      endTime: 1722183600,
    },
  },
} as const;

export const MISSIONS_CONFIG: Record<string, Record<string, MissionConfig>> = {
  [CHAINS.BERACHAIN]: {
    // [MISSIONS.BERA_METAL_SOLID]: {
    //   address: BGT_ADDRESS,
    //   startTime: 1720461600,
    //   startStreak: {
    //     type: MISSION_TYPES.ACTIVATE_BOOST,
    //     filterCriteria: {
    //       validator: THJ_VALIDATOR_ADDRESS,
    //     },
    //   },
    //   endStreak: {
    //     type: MISSION_TYPES.DROP_BOOST,
    //     filterCriteria: {
    //       validator: THJ_VALIDATOR_ADDRESS,
    //     },
    //   },
    // },
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
  [CHAINS.ZORA]: {
    from: 15591949,
  },
} as const;

export const RPC_ENDPOINTS = {
  [CHAINS.BASE]: process.env.RPC_BASE_HTTP,
  [CHAINS.ARBITRUM]: process.env.RPC_ARBITRUM_ONE_HTTP,
  [CHAINS.BERACHAIN]: process.env.RPC_BERA_HTTP,
  [CHAINS.OPTIMISM]: process.env.RPC_OPTIMISM_HTTP,
  [CHAINS.ZORA]: process.env.RPC_ZORA_HTTP,
} as const;

export const ARCHIVE_GATEWAYS = {
  [CHAINS.BASE]: "https://v2.archive.subsquid.io/network/base-mainnet",
  [CHAINS.ARBITRUM]: "https://v2.archive.subsquid.io/network/arbitrum-one",
  [CHAINS.OPTIMISM]: "https://v2.archive.subsquid.io/network/optimism-mainnet",
  [CHAINS.ZORA]: "https://v2.archive.subsquid.io/network/zora-mainnet",
  [CHAINS.BERACHAIN]: "https://v2.archive.subsquid.io/network/berachain-bartio",
} as const;
