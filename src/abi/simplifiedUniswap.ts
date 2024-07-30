import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    Mint: event("0x4c209b5fc8ad50758f13e2e1088ba56a560dff690a1c6fef26394f4c03821c4f", "Mint(address,uint256,uint256)", {"sender": indexed(p.address), "amount0": p.uint256, "amount1": p.uint256}),
    Swap: event("0xc42079f94a6350d7e6235f29174924f928cc2ac818eb64fed8004e115fbcca67", "Swap(address,address,int256,int256,uint160,uint128,int24)", {"sender": indexed(p.address), "recipient": indexed(p.address), "amount0": p.int256, "amount1": p.int256, "sqrtPriceX96": p.uint160, "liquidity": p.uint128, "tick": p.int24}),
}

export class Contract extends ContractBase {
}

/// Event types
export type MintEventArgs = EParams<typeof events.Mint>
export type SwapEventArgs = EParams<typeof events.Swap>
