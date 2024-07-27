import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    TokensDeposited: event("0x9474e087d8a0e83962ac44e292b4aba027426203ea66adfb1dd9f65795ff599a", "TokensDeposited(address,address,address,uint256)", {"connector": p.address, "depositor": p.address, "receiver": p.address, "depositAmount": p.uint256}),
}

export class Contract extends ContractBase {
}

/// Event types
export type TokensDepositedEventArgs = EParams<typeof events.TokensDeposited>
