import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    ClaimLP: event("0x7436794b6cd88fe788cb3e86147cb3c7fce0762dc1fb3f3fc7129f4e050d8750", "ClaimLP(address,uint256)", {"claimer": indexed(p.address), "_1": p.uint256}),
    ClaimLaunchedToken: event("0x96ace2dafc5290d4a5bc6d219a00e78de7bf76ef36aad22a15b67ac4e1b64e90", "ClaimLaunchedToken(address,uint256)", {"claimer": p.address, "amount": p.uint256}),
    DepositLaunchedToken: event("0x6bdec8daa626354fc2fdd7004bafcd44f507178a4063e8ab86e7f7edcad54c47", "DepositLaunchedToken(address,uint256)", {"depositer": indexed(p.address), "_1": p.uint256}),
    DepositRaisedToken: event("0xbbb5c4b6b57b294d6caa973a5fa402ca0cdd98eda8fed45f52ad8e7b6e016253", "DepositRaisedToken(address,uint256)", {"depositer": indexed(p.address), "_1": p.uint256}),
    Paused: event("0x32fb7c9891bc4f963c7de9f1186d2a7755c7d6e9f4604dabe1d8bb3027c2f49e", "Paused(uint256)", {"timestamp": p.uint256}),
    Perform: event("0x1491e774db6408b163e277ee75b3a567a93b8e29dc61398e35f91abdf2b68386", "Perform(uint256)", {"status": p.uint256}),
    Refund: event("0xbb28353e4598c3b9199101a66e0989549b659a59a54d2c27fbb183f1932c8e6d", "Refund(address,uint256)", {"depositer": indexed(p.address), "_1": p.uint256}),
    Resumed: event("0xc18d59353f4d9a5a26b5ce9502815f2122c73f1eb8618c467cd9b25c8d4e4c41", "Resumed(uint256)", {"timestamp": p.uint256}),
    Withdraw: event("0x884edad9ce6fa2440d8a54cc123490eb96d2768479d49ff9c7366125a9424364", "Withdraw(address,uint256)", {"withdrawer": indexed(p.address), "_1": p.uint256}),
}

export const functions = {
    FTOState: viewFun("0xab9bbd8f", "FTOState()", {}, p.uint8),
    checkUpkeep: fun("0x6e04ff0d", "checkUpkeep(bytes)", {"checkData": p.bytes}, {"upkeepNeeded": p.bool, "performData": p.bytes}),
    claimLP: fun("0xe8bbb75b", "claimLP(address)", {"claimer": p.address}, ),
    claimableLP: viewFun("0xf495983a", "claimableLP(address)", {"claimer": p.address}, p.uint256),
    depositLaunchedToken: fun("0x98142393", "depositLaunchedToken(address,uint256)", {"depositer": p.address, "amount": p.uint256}, ),
    depositRaisedToken: fun("0x29f9a87d", "depositRaisedToken(address,uint256)", {"depositer": p.address, "amount": p.uint256}, ),
    launchedToken: viewFun("0xfd435125", "launchedToken()", {}, p.address),
    launchedTokenProvider: viewFun("0x2fb611c5", "launchedTokenProvider()", {}, p.address),
    pause: fun("0x8456cb59", "pause()", {}, ),
    performUpkeep: fun("0x4585e33b", "performUpkeep(bytes)", {"performData": p.bytes}, ),
    raisedToken: viewFun("0xbc195d8b", "raisedToken()", {}, p.address),
    raisedTokenDeposit: viewFun("0x8cd68ca9", "raisedTokenDeposit(address)", {"_0": p.address}, p.uint256),
    refundRaisedToken: fun("0x420e43dc", "refundRaisedToken(address)", {"depositer": p.address}, ),
    resume: fun("0x046f7da2", "resume()", {}, ),
    withdraw: fun("0x51cff8d9", "withdraw(address)", {"withdrawer": p.address}, ),
    withdrawFee: fun("0x1ac3ddeb", "withdrawFee(address)", {"feeTo": p.address}, ),
}

export class Contract extends ContractBase {

    FTOState() {
        return this.eth_call(functions.FTOState, {})
    }

    claimableLP(claimer: ClaimableLPParams["claimer"]) {
        return this.eth_call(functions.claimableLP, {claimer})
    }

    launchedToken() {
        return this.eth_call(functions.launchedToken, {})
    }

    launchedTokenProvider() {
        return this.eth_call(functions.launchedTokenProvider, {})
    }

    raisedToken() {
        return this.eth_call(functions.raisedToken, {})
    }

    raisedTokenDeposit(_0: RaisedTokenDepositParams["_0"]) {
        return this.eth_call(functions.raisedTokenDeposit, {_0})
    }
}

/// Event types
export type ClaimLPEventArgs = EParams<typeof events.ClaimLP>
export type ClaimLaunchedTokenEventArgs = EParams<typeof events.ClaimLaunchedToken>
export type DepositLaunchedTokenEventArgs = EParams<typeof events.DepositLaunchedToken>
export type DepositRaisedTokenEventArgs = EParams<typeof events.DepositRaisedToken>
export type PausedEventArgs = EParams<typeof events.Paused>
export type PerformEventArgs = EParams<typeof events.Perform>
export type RefundEventArgs = EParams<typeof events.Refund>
export type ResumedEventArgs = EParams<typeof events.Resumed>
export type WithdrawEventArgs = EParams<typeof events.Withdraw>

/// Function types
export type FTOStateParams = FunctionArguments<typeof functions.FTOState>
export type FTOStateReturn = FunctionReturn<typeof functions.FTOState>

export type CheckUpkeepParams = FunctionArguments<typeof functions.checkUpkeep>
export type CheckUpkeepReturn = FunctionReturn<typeof functions.checkUpkeep>

export type ClaimLPParams = FunctionArguments<typeof functions.claimLP>
export type ClaimLPReturn = FunctionReturn<typeof functions.claimLP>

export type ClaimableLPParams = FunctionArguments<typeof functions.claimableLP>
export type ClaimableLPReturn = FunctionReturn<typeof functions.claimableLP>

export type DepositLaunchedTokenParams = FunctionArguments<typeof functions.depositLaunchedToken>
export type DepositLaunchedTokenReturn = FunctionReturn<typeof functions.depositLaunchedToken>

export type DepositRaisedTokenParams = FunctionArguments<typeof functions.depositRaisedToken>
export type DepositRaisedTokenReturn = FunctionReturn<typeof functions.depositRaisedToken>

export type LaunchedTokenParams = FunctionArguments<typeof functions.launchedToken>
export type LaunchedTokenReturn = FunctionReturn<typeof functions.launchedToken>

export type LaunchedTokenProviderParams = FunctionArguments<typeof functions.launchedTokenProvider>
export type LaunchedTokenProviderReturn = FunctionReturn<typeof functions.launchedTokenProvider>

export type PauseParams = FunctionArguments<typeof functions.pause>
export type PauseReturn = FunctionReturn<typeof functions.pause>

export type PerformUpkeepParams = FunctionArguments<typeof functions.performUpkeep>
export type PerformUpkeepReturn = FunctionReturn<typeof functions.performUpkeep>

export type RaisedTokenParams = FunctionArguments<typeof functions.raisedToken>
export type RaisedTokenReturn = FunctionReturn<typeof functions.raisedToken>

export type RaisedTokenDepositParams = FunctionArguments<typeof functions.raisedTokenDeposit>
export type RaisedTokenDepositReturn = FunctionReturn<typeof functions.raisedTokenDeposit>

export type RefundRaisedTokenParams = FunctionArguments<typeof functions.refundRaisedToken>
export type RefundRaisedTokenReturn = FunctionReturn<typeof functions.refundRaisedToken>

export type ResumeParams = FunctionArguments<typeof functions.resume>
export type ResumeReturn = FunctionReturn<typeof functions.resume>

export type WithdrawParams = FunctionArguments<typeof functions.withdraw>
export type WithdrawReturn = FunctionReturn<typeof functions.withdraw>

export type WithdrawFeeParams = FunctionArguments<typeof functions.withdrawFee>
export type WithdrawFeeReturn = FunctionReturn<typeof functions.withdrawFee>

