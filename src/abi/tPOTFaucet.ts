import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const functions = {
    faucet: fun("0xde5f72fd", "faucet()", {}, ),
    balanceOf: viewFun("0x70a08231", "balanceOf(address)", {"account": p.address}, p.uint256),
    faucetClaimer: viewFun("0xb63fb066", "faucetClaimer(address)", {"_0": p.address}, p.bool),
}

export class Contract extends ContractBase {

    balanceOf(account: BalanceOfParams["account"]) {
        return this.eth_call(functions.balanceOf, {account})
    }

    faucetClaimer(_0: FaucetClaimerParams["_0"]) {
        return this.eth_call(functions.faucetClaimer, {_0})
    }
}

/// Function types
export type FaucetParams = FunctionArguments<typeof functions.faucet>
export type FaucetReturn = FunctionReturn<typeof functions.faucet>

export type BalanceOfParams = FunctionArguments<typeof functions.balanceOf>
export type BalanceOfReturn = FunctionReturn<typeof functions.balanceOf>

export type FaucetClaimerParams = FunctionArguments<typeof functions.faucetClaimer>
export type FaucetClaimerReturn = FunctionReturn<typeof functions.faucetClaimer>

