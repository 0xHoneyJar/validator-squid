import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    DelegateStaked: event("0x5d84fd7efe2fd5203970924007f1f56ec874f1fdbe6acec5f208000a72c70456", "DelegateStaked(address,address,uint256)", {"account": indexed(p.address), "delegate": indexed(p.address), "amount": p.uint256}),
    DelegateWithdrawn: event("0xb1296e59c4148d97ce0bf24c50bb4bd58367005c1871eef38c03187f3cff8504", "DelegateWithdrawn(address,address,uint256)", {"account": indexed(p.address), "delegate": indexed(p.address), "amount": p.uint256}),
    DistributorSet: event("0x86719c518c7d99ac94b3d405d462ea876ba5cd0a978461dc9a7c9862a9485886", "DistributorSet(address)", {"distributor": indexed(p.address)}),
    IncentiveAdded: event("0x8bf110a87db594cedb42356a9ca4b64a0d26fb09909292e842c614823e41d337", "IncentiveAdded(address,address,uint256,uint256)", {"token": indexed(p.address), "sender": p.address, "amount": p.uint256, "incentiveRate": p.uint256}),
    IncentiveTokenRemoved: event("0x65ff9187746d336179f23ad14746fa804e31bac422ef2dd63b9dc97313caa797", "IncentiveTokenRemoved(address)", {"token": indexed(p.address)}),
    IncentiveTokenWhitelisted: event("0xa975f951c4e6314e31b3e4d9a56f84e05e0bf0d4a1e512caab2f9cc0a2494132", "IncentiveTokenWhitelisted(address,uint256)", {"token": indexed(p.address), "minIncentiveRate": p.uint256}),
    IncentivesProcessed: event("0xd53172319994f5af85b7efcb42b2c2c36672baa8560f64b2b0c1d7f009014332", "IncentivesProcessed(address,address,uint256,uint256)", {"coinbase": indexed(p.address), "token": indexed(p.address), "bgtEmitted": p.uint256, "amount": p.uint256}),
    MaxIncentiveTokensCountUpdated: event("0x8d31d8a650a75f6978e9d7331686f948e5fddeaa4940eddb941d4129459d8bf3", "MaxIncentiveTokensCountUpdated(uint8)", {"maxIncentiveTokensCount": p.uint8}),
    OperatorSet: event("0xfd489696792cc4c5d5b226c46f008e459c8ec9b746c49191d74bb92c19fd1867", "OperatorSet(address,address)", {"account": p.address, "operator": p.address}),
    Recovered: event("0x8c1256b8896378cd5044f80c202f9772b9d77dc85c8a6eb51967210b09bfaa28", "Recovered(address,uint256)", {"token": p.address, "amount": p.uint256}),
    RewardAdded: event("0xde88a922e0d3b88b24e9623efeb464919c6bf9f66857a65e2bfcf2ce87a9433d", "RewardAdded(uint256)", {"reward": p.uint256}),
    RewardPaid: event("0x540798df468d7b23d11f156fdb954cb19ad414d150722a7b6d55ba369dea792e", "RewardPaid(address,address,uint256)", {"account": indexed(p.address), "to": p.address, "reward": p.uint256}),
    RewardsDurationUpdated: event("0xfb46ca5a5e06d4540d6387b930a7c978bce0db5f449ec6b3f5d07c6e1d44f2d3", "RewardsDurationUpdated(uint256)", {"newDuration": p.uint256}),
    Staked: event("0x9e71bc8eea02a63969f509818f2dafb9254532904319f9dbda79b67bd34a5f3d", "Staked(address,uint256)", {"account": indexed(p.address), "amount": p.uint256}),
    Withdrawn: event("0x7084f5476618d8e60b11ef0d7d3f06914655adb8793e28ff7f018d4c76d505d5", "Withdrawn(address,uint256)", {"account": indexed(p.address), "amount": p.uint256}),
}

export const functions = {
    addIncentive: fun("0xb42f60db", "addIncentive(address,uint256,uint256)", {"token": p.address, "amount": p.uint256, "incentiveRate": p.uint256}, ),
    balanceOf: viewFun("0x70a08231", "balanceOf(address)", {"account": p.address}, p.uint256),
    delegateStake: fun("0x3c323a1b", "delegateStake(address,uint256)", {"account": p.address, "amount": p.uint256}, ),
    delegateWithdraw: fun("0x5281244f", "delegateWithdraw(address,uint256)", {"account": p.address, "amount": p.uint256}, ),
    distributor: viewFun("0xbfe10928", "distributor()", {}, p.address),
    earned: viewFun("0x008cc262", "earned(address)", {"account": p.address}, p.uint256),
    exit: fun("0xe9fad8ee", "exit()", {}, ),
    getDelegateStake: viewFun("0x8f650f9c", "getDelegateStake(address,address)", {"account": p.address, "delegate": p.address}, p.uint256),
    getReward: fun("0xc00007b0", "getReward(address)", {"account": p.address}, p.uint256),
    getRewardForDuration: viewFun("0x1c1f78eb", "getRewardForDuration()", {}, p.uint256),
    getTotalDelegateStaked: viewFun("0xa4dbda3c", "getTotalDelegateStaked(address)", {"account": p.address}, p.uint256),
    getWhitelistedTokens: viewFun("0xe26f7900", "getWhitelistedTokens()", {}, p.array(p.address)),
    getWhitelistedTokensCount: viewFun("0x9cd3f384", "getWhitelistedTokensCount()", {}, p.uint256),
    initialize: fun("0xf8c8765e", "initialize(address,address,address,address)", {"_berachef": p.address, "_bgt": p.address, "_distributor": p.address, "_stakingToken": p.address}, ),
    lastTimeRewardApplicable: viewFun("0x80faa57d", "lastTimeRewardApplicable()", {}, p.uint256),
    notifyRewardAmount: fun("0xb66503cf", "notifyRewardAmount(address,uint256)", {"coinbase": p.address, "reward": p.uint256}, ),
    operator: viewFun("0x9a307391", "operator(address)", {"account": p.address}, p.address),
    pause: fun("0x02329a29", "pause(bool)", {"_paused": p.bool}, ),
    recoverERC20: fun("0x8980f11f", "recoverERC20(address,uint256)", {"tokenAddress": p.address, "tokenAmount": p.uint256}, ),
    removeIncentiveToken: fun("0xe7d379a9", "removeIncentiveToken(address)", {"token": p.address}, ),
    rewardPerToken: viewFun("0xcd3daf9d", "rewardPerToken()", {}, p.uint256),
    setDistributor: fun("0x75619ab5", "setDistributor(address)", {"_rewardDistribution": p.address}, ),
    setMaxIncentiveTokensCount: fun("0x54659b94", "setMaxIncentiveTokensCount(uint8)", {"_maxIncentiveTokensCount": p.uint8}, ),
    setOperator: fun("0xb3ab15fb", "setOperator(address)", {"_operator": p.address}, ),
    setRewardsDuration: fun("0xcc1a378f", "setRewardsDuration(uint256)", {"_rewardsDuration": p.uint256}, ),
    stake: fun("0xa694fc3a", "stake(uint256)", {"amount": p.uint256}, ),
    totalSupply: viewFun("0x18160ddd", "totalSupply()", {}, p.uint256),
    whitelistIncentiveToken: fun("0x91888f29", "whitelistIncentiveToken(address,uint256)", {"token": p.address, "minIncentiveRate": p.uint256}, ),
    withdraw: fun("0x2e1a7d4d", "withdraw(uint256)", {"amount": p.uint256}, ),
}

export class Contract extends ContractBase {

    balanceOf(account: BalanceOfParams["account"]) {
        return this.eth_call(functions.balanceOf, {account})
    }

    distributor() {
        return this.eth_call(functions.distributor, {})
    }

    earned(account: EarnedParams["account"]) {
        return this.eth_call(functions.earned, {account})
    }

    getDelegateStake(account: GetDelegateStakeParams["account"], delegate: GetDelegateStakeParams["delegate"]) {
        return this.eth_call(functions.getDelegateStake, {account, delegate})
    }

    getRewardForDuration() {
        return this.eth_call(functions.getRewardForDuration, {})
    }

    getTotalDelegateStaked(account: GetTotalDelegateStakedParams["account"]) {
        return this.eth_call(functions.getTotalDelegateStaked, {account})
    }

    getWhitelistedTokens() {
        return this.eth_call(functions.getWhitelistedTokens, {})
    }

    getWhitelistedTokensCount() {
        return this.eth_call(functions.getWhitelistedTokensCount, {})
    }

    lastTimeRewardApplicable() {
        return this.eth_call(functions.lastTimeRewardApplicable, {})
    }

    operator(account: OperatorParams["account"]) {
        return this.eth_call(functions.operator, {account})
    }

    rewardPerToken() {
        return this.eth_call(functions.rewardPerToken, {})
    }

    totalSupply() {
        return this.eth_call(functions.totalSupply, {})
    }
}

/// Event types
export type DelegateStakedEventArgs = EParams<typeof events.DelegateStaked>
export type DelegateWithdrawnEventArgs = EParams<typeof events.DelegateWithdrawn>
export type DistributorSetEventArgs = EParams<typeof events.DistributorSet>
export type IncentiveAddedEventArgs = EParams<typeof events.IncentiveAdded>
export type IncentiveTokenRemovedEventArgs = EParams<typeof events.IncentiveTokenRemoved>
export type IncentiveTokenWhitelistedEventArgs = EParams<typeof events.IncentiveTokenWhitelisted>
export type IncentivesProcessedEventArgs = EParams<typeof events.IncentivesProcessed>
export type MaxIncentiveTokensCountUpdatedEventArgs = EParams<typeof events.MaxIncentiveTokensCountUpdated>
export type OperatorSetEventArgs = EParams<typeof events.OperatorSet>
export type RecoveredEventArgs = EParams<typeof events.Recovered>
export type RewardAddedEventArgs = EParams<typeof events.RewardAdded>
export type RewardPaidEventArgs = EParams<typeof events.RewardPaid>
export type RewardsDurationUpdatedEventArgs = EParams<typeof events.RewardsDurationUpdated>
export type StakedEventArgs = EParams<typeof events.Staked>
export type WithdrawnEventArgs = EParams<typeof events.Withdrawn>

/// Function types
export type AddIncentiveParams = FunctionArguments<typeof functions.addIncentive>
export type AddIncentiveReturn = FunctionReturn<typeof functions.addIncentive>

export type BalanceOfParams = FunctionArguments<typeof functions.balanceOf>
export type BalanceOfReturn = FunctionReturn<typeof functions.balanceOf>

export type DelegateStakeParams = FunctionArguments<typeof functions.delegateStake>
export type DelegateStakeReturn = FunctionReturn<typeof functions.delegateStake>

export type DelegateWithdrawParams = FunctionArguments<typeof functions.delegateWithdraw>
export type DelegateWithdrawReturn = FunctionReturn<typeof functions.delegateWithdraw>

export type DistributorParams = FunctionArguments<typeof functions.distributor>
export type DistributorReturn = FunctionReturn<typeof functions.distributor>

export type EarnedParams = FunctionArguments<typeof functions.earned>
export type EarnedReturn = FunctionReturn<typeof functions.earned>

export type ExitParams = FunctionArguments<typeof functions.exit>
export type ExitReturn = FunctionReturn<typeof functions.exit>

export type GetDelegateStakeParams = FunctionArguments<typeof functions.getDelegateStake>
export type GetDelegateStakeReturn = FunctionReturn<typeof functions.getDelegateStake>

export type GetRewardParams = FunctionArguments<typeof functions.getReward>
export type GetRewardReturn = FunctionReturn<typeof functions.getReward>

export type GetRewardForDurationParams = FunctionArguments<typeof functions.getRewardForDuration>
export type GetRewardForDurationReturn = FunctionReturn<typeof functions.getRewardForDuration>

export type GetTotalDelegateStakedParams = FunctionArguments<typeof functions.getTotalDelegateStaked>
export type GetTotalDelegateStakedReturn = FunctionReturn<typeof functions.getTotalDelegateStaked>

export type GetWhitelistedTokensParams = FunctionArguments<typeof functions.getWhitelistedTokens>
export type GetWhitelistedTokensReturn = FunctionReturn<typeof functions.getWhitelistedTokens>

export type GetWhitelistedTokensCountParams = FunctionArguments<typeof functions.getWhitelistedTokensCount>
export type GetWhitelistedTokensCountReturn = FunctionReturn<typeof functions.getWhitelistedTokensCount>

export type InitializeParams = FunctionArguments<typeof functions.initialize>
export type InitializeReturn = FunctionReturn<typeof functions.initialize>

export type LastTimeRewardApplicableParams = FunctionArguments<typeof functions.lastTimeRewardApplicable>
export type LastTimeRewardApplicableReturn = FunctionReturn<typeof functions.lastTimeRewardApplicable>

export type NotifyRewardAmountParams = FunctionArguments<typeof functions.notifyRewardAmount>
export type NotifyRewardAmountReturn = FunctionReturn<typeof functions.notifyRewardAmount>

export type OperatorParams = FunctionArguments<typeof functions.operator>
export type OperatorReturn = FunctionReturn<typeof functions.operator>

export type PauseParams = FunctionArguments<typeof functions.pause>
export type PauseReturn = FunctionReturn<typeof functions.pause>

export type RecoverERC20Params = FunctionArguments<typeof functions.recoverERC20>
export type RecoverERC20Return = FunctionReturn<typeof functions.recoverERC20>

export type RemoveIncentiveTokenParams = FunctionArguments<typeof functions.removeIncentiveToken>
export type RemoveIncentiveTokenReturn = FunctionReturn<typeof functions.removeIncentiveToken>

export type RewardPerTokenParams = FunctionArguments<typeof functions.rewardPerToken>
export type RewardPerTokenReturn = FunctionReturn<typeof functions.rewardPerToken>

export type SetDistributorParams = FunctionArguments<typeof functions.setDistributor>
export type SetDistributorReturn = FunctionReturn<typeof functions.setDistributor>

export type SetMaxIncentiveTokensCountParams = FunctionArguments<typeof functions.setMaxIncentiveTokensCount>
export type SetMaxIncentiveTokensCountReturn = FunctionReturn<typeof functions.setMaxIncentiveTokensCount>

export type SetOperatorParams = FunctionArguments<typeof functions.setOperator>
export type SetOperatorReturn = FunctionReturn<typeof functions.setOperator>

export type SetRewardsDurationParams = FunctionArguments<typeof functions.setRewardsDuration>
export type SetRewardsDurationReturn = FunctionReturn<typeof functions.setRewardsDuration>

export type StakeParams = FunctionArguments<typeof functions.stake>
export type StakeReturn = FunctionReturn<typeof functions.stake>

export type TotalSupplyParams = FunctionArguments<typeof functions.totalSupply>
export type TotalSupplyReturn = FunctionReturn<typeof functions.totalSupply>

export type WhitelistIncentiveTokenParams = FunctionArguments<typeof functions.whitelistIncentiveToken>
export type WhitelistIncentiveTokenReturn = FunctionReturn<typeof functions.whitelistIncentiveToken>

export type WithdrawParams = FunctionArguments<typeof functions.withdraw>
export type WithdrawReturn = FunctionReturn<typeof functions.withdraw>

