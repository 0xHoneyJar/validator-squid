import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    Deployed: event("0xad7077179e9de2afe154cfcf6adfafa099096c0b68e5c3acbd8eeb4fc7823e73", "Deployed(address,address,uint256,uint256,uint256,uint256,uint256,string[])", {"deployer": indexed(p.address), "token": indexed(p.address), "totalSupply": p.uint256, "buybackMode": p.uint256, "buyTax": p.uint256, "sellTax": p.uint256, "ownersCut": p.uint256, "urls": p.array(p.string)}),
    NewLaunch: event("0x3995763400bfe6f5176b6448accdd6d5fa848ec519369545afa321c7caf12263", "NewLaunch(address,address,address,uint256,uint256,uint256)", {"deployer": indexed(p.address), "token": indexed(p.address), "liquidityToken": indexed(p.address), "totalSupply": p.uint256, "fee": p.uint256, "amount": p.uint256}),
    OwnershipTransferred: event("0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0", "OwnershipTransferred(address,address)", {"previousOwner": indexed(p.address), "newOwner": indexed(p.address)}),
}

export const functions = {
    deployers: viewFun("0x6a2385e8", "deployers(address)", {"token": p.address}, p.address),
    factory: viewFun("0xc45a0155", "factory()", {}, p.address),
    initialize: fun("0xc4d66de8", "initialize(address)", {"_vault": p.address}, ),
    isMemeswapToken: viewFun("0x10f94e95", "isMemeswapToken(address)", {"_0": p.address}, p.bool),
    launch: fun("0xeb0ab6f8", "launch((string,string,uint256,uint256[],string[],uint256,uint256,uint256,address))", {"_params": p.struct({"name": p.string, "symbol": p.string, "totalSupply": p.uint256, "taxes": p.array(p.uint256), "urls": p.array(p.string), "duration": p.uint256, "minAmount": p.uint256, "buyAmount": p.uint256, "pairToUnlock": p.address})}, {"token": p.address, "liquidity": p.uint256}),
    maxLiquidity: viewFun("0x70c0345c", "maxLiquidity()", {}, p.uint256),
    maxTax: viewFun("0x6d8813c5", "maxTax()", {}, p.uint256),
    minLiquidity: viewFun("0x252cf2d2", "minLiquidity()", {}, p.uint256),
    owner: viewFun("0x8da5cb5b", "owner()", {}, p.address),
    renounceOwnership: fun("0x715018a6", "renounceOwnership()", {}, ),
    router: viewFun("0xf887ea40", "router()", {}, p.address),
    setChadBar: fun("0xf8dab83c", "setChadBar(uint256)", {"_chadBar": p.uint256}, ),
    setLiquidityRange: fun("0x2c682a59", "setLiquidityRange(uint256,uint256)", {"_min": p.uint256, "_max": p.uint256}, ),
    setMaxTax: fun("0x28bc35c1", "setMaxTax(uint256)", {"_maxTax": p.uint256}, ),
    setValhallaFee: fun("0x25ef2247", "setValhallaFee(address,uint256)", {"_vault": p.address, "_fee": p.uint256}, ),
    transferOwnership: fun("0xf2fde38b", "transferOwnership(address)", {"newOwner": p.address}, ),
    vault: viewFun("0xfbfa77cf", "vault()", {}, p.address),
}

export class Contract extends ContractBase {

    deployers(token: DeployersParams["token"]) {
        return this.eth_call(functions.deployers, {token})
    }

    factory() {
        return this.eth_call(functions.factory, {})
    }

    isMemeswapToken(_0: IsMemeswapTokenParams["_0"]) {
        return this.eth_call(functions.isMemeswapToken, {_0})
    }

    maxLiquidity() {
        return this.eth_call(functions.maxLiquidity, {})
    }

    maxTax() {
        return this.eth_call(functions.maxTax, {})
    }

    minLiquidity() {
        return this.eth_call(functions.minLiquidity, {})
    }

    owner() {
        return this.eth_call(functions.owner, {})
    }

    router() {
        return this.eth_call(functions.router, {})
    }

    vault() {
        return this.eth_call(functions.vault, {})
    }
}

/// Event types
export type DeployedEventArgs = EParams<typeof events.Deployed>
export type NewLaunchEventArgs = EParams<typeof events.NewLaunch>
export type OwnershipTransferredEventArgs = EParams<typeof events.OwnershipTransferred>

/// Function types
export type DeployersParams = FunctionArguments<typeof functions.deployers>
export type DeployersReturn = FunctionReturn<typeof functions.deployers>

export type FactoryParams = FunctionArguments<typeof functions.factory>
export type FactoryReturn = FunctionReturn<typeof functions.factory>

export type InitializeParams = FunctionArguments<typeof functions.initialize>
export type InitializeReturn = FunctionReturn<typeof functions.initialize>

export type IsMemeswapTokenParams = FunctionArguments<typeof functions.isMemeswapToken>
export type IsMemeswapTokenReturn = FunctionReturn<typeof functions.isMemeswapToken>

export type LaunchParams = FunctionArguments<typeof functions.launch>
export type LaunchReturn = FunctionReturn<typeof functions.launch>

export type MaxLiquidityParams = FunctionArguments<typeof functions.maxLiquidity>
export type MaxLiquidityReturn = FunctionReturn<typeof functions.maxLiquidity>

export type MaxTaxParams = FunctionArguments<typeof functions.maxTax>
export type MaxTaxReturn = FunctionReturn<typeof functions.maxTax>

export type MinLiquidityParams = FunctionArguments<typeof functions.minLiquidity>
export type MinLiquidityReturn = FunctionReturn<typeof functions.minLiquidity>

export type OwnerParams = FunctionArguments<typeof functions.owner>
export type OwnerReturn = FunctionReturn<typeof functions.owner>

export type RenounceOwnershipParams = FunctionArguments<typeof functions.renounceOwnership>
export type RenounceOwnershipReturn = FunctionReturn<typeof functions.renounceOwnership>

export type RouterParams = FunctionArguments<typeof functions.router>
export type RouterReturn = FunctionReturn<typeof functions.router>

export type SetChadBarParams = FunctionArguments<typeof functions.setChadBar>
export type SetChadBarReturn = FunctionReturn<typeof functions.setChadBar>

export type SetLiquidityRangeParams = FunctionArguments<typeof functions.setLiquidityRange>
export type SetLiquidityRangeReturn = FunctionReturn<typeof functions.setLiquidityRange>

export type SetMaxTaxParams = FunctionArguments<typeof functions.setMaxTax>
export type SetMaxTaxReturn = FunctionReturn<typeof functions.setMaxTax>

export type SetValhallaFeeParams = FunctionArguments<typeof functions.setValhallaFee>
export type SetValhallaFeeReturn = FunctionReturn<typeof functions.setValhallaFee>

export type TransferOwnershipParams = FunctionArguments<typeof functions.transferOwnership>
export type TransferOwnershipReturn = FunctionReturn<typeof functions.transferOwnership>

export type VaultParams = FunctionArguments<typeof functions.vault>
export type VaultReturn = FunctionReturn<typeof functions.vault>

