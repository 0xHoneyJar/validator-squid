import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    Approval: event("0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925", "Approval(address,address,uint256)", {"owner": indexed(p.address), "spender": indexed(p.address), "value": p.uint256}),
    ClaimProtocolRevenues: event("0xca7a4a65a94ed2f37538814e00e1cd4c41a78261561e3f3794592f11409cf5af", "ClaimProtocolRevenues(address,address,uint128)", {"owner": indexed(p.address), "asset": indexed(p.address), "protocolRevenues": p.uint128}),
    Deposit: event("0xdcbc1c05240f31ff3ad067ef1ee35ce4997762752e3a095284754544f4c709d7", "Deposit(address,address,uint256,uint256)", {"sender": indexed(p.address), "owner": indexed(p.address), "assets": p.uint256, "shares": p.uint256}),
    Initialized: event("0xc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d2", "Initialized(uint64)", {"version": p.uint64}),
    OwnershipTransferred: event("0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0", "OwnershipTransferred(address,address)", {"previousOwner": indexed(p.address), "newOwner": indexed(p.address)}),
    SetController: event("0x1147ed693382f9e11a08033547a7c7fc9772828b61d20f839cc18d23488422ea", "SetController(address,address,address)", {"owner": indexed(p.address), "oldController": p.address, "newController": p.address}),
    SettleOption: event("0xf442c4184a3a07cc25d3d277b88c8196449ac6801442f631207a16393ec5ad14", "SettleOption(uint256,address,bool,uint256,uint256,uint256,uint256,address,address,uint8)", {"optionId": indexed(p.uint256), "holder": indexed(p.address), "isPut": p.bool, "strike": p.uint256, "quantity": p.uint256, "premium": p.uint256, "expiration": p.uint256, "base": indexed(p.address), "quote": p.address, "status": p.uint8}),
    Transfer: event("0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef", "Transfer(address,address,uint256)", {"from": indexed(p.address), "to": indexed(p.address), "value": p.uint256}),
    Upgraded: event("0xbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b", "Upgraded(address)", {"implementation": indexed(p.address)}),
    Withdraw: event("0xfbde797d201c681b91056529119e0b02407c7bb96a4a2c75c01fc9667232c8db", "Withdraw(address,address,address,uint256,uint256)", {"sender": indexed(p.address), "receiver": indexed(p.address), "owner": indexed(p.address), "assets": p.uint256, "shares": p.uint256}),
    WriteOption: event("0xdefeb8ea79be97b30cabb4ed58bde164c804dd0cd7d680251225323c6798ee2d", "WriteOption(uint256,address,bool,uint256,uint256,uint256,uint256,address,address)", {"optionId": indexed(p.uint256), "holder": indexed(p.address), "isPut": p.bool, "strike": p.uint256, "quantity": p.uint256, "premium": p.uint256, "expiration": p.uint256, "base": p.address, "quote": p.address}),
}

export const functions = {
    MAX_FEE: viewFun("0xbc063e1a", "MAX_FEE()", {}, p.uint8),
    UPGRADE_INTERFACE_VERSION: viewFun("0xad3cb1cc", "UPGRADE_INTERFACE_VERSION()", {}, p.string),
    _options: viewFun("0xa2545761", "_options(uint256)", {"id": p.uint256}, {"optionId": p.uint256, "isPut": p.bool, "strike": p.uint256, "quantity": p.uint256, "premium": p.uint256, "collateralAmount": p.uint256, "expiration": p.uint256, "status": p.uint8, "holder": p.address, "base": p.address, "quote": p.address}),
    allowance: viewFun("0xdd62ed3e", "allowance(address,address)", {"owner": p.address, "spender": p.address}, p.uint256),
    approve: fun("0x095ea7b3", "approve(address,uint256)", {"spender": p.address, "value": p.uint256}, p.bool),
    asset: viewFun("0x38d52e0f", "asset()", {}, p.address),
    balanceOf: viewFun("0x70a08231", "balanceOf(address)", {"account": p.address}, p.uint256),
    claimProtocolRevenues: fun("0xa6202bf2", "claimProtocolRevenues(address)", {"asset": p.address}, ),
    controller: viewFun("0xf77c4791", "controller()", {}, p.address),
    convertToAssets: viewFun("0x07a2d13a", "convertToAssets(uint256)", {"shares": p.uint256}, p.uint256),
    convertToShares: viewFun("0xc6e6f592", "convertToShares(uint256)", {"assets": p.uint256}, p.uint256),
    cumulatedDeposit: viewFun("0xa8bce831", "cumulatedDeposit()", {}, p.uint256),
    cumulatedWithdraw: viewFun("0xe068981b", "cumulatedWithdraw()", {}, p.uint256),
    decimals: viewFun("0x313ce567", "decimals()", {}, p.uint8),
    deposit: fun("0xfaa9bce9", "deposit(uint256,address,bytes)", {"assets": p.uint256, "receiver": p.address, "signature": p.bytes}, p.uint256),
    getDataFeedLatestAnswerPyth: fun("0xdc32ae8d", "getDataFeedLatestAnswerPyth(address,bytes[])", {"asset": p.address, "priceUpdateData": p.array(p.bytes)}, {"answer": p.uint256, "decimals": p.uint8}),
    getNonce: viewFun("0x2d0335ab", "getNonce(address)", {"user": p.address}, p.uint256),
    initialize: fun("0xa5b81fdf", "initialize(address,address,address,string,string,address)", {"initialOwner": p.address, "initialController": p.address, "_asset": p.address, "_name": p.string, "_symbol": p.string, "_bendVault": p.address}, ),
    isSignatureValidationEnabled: viewFun("0x023a446a", "isSignatureValidationEnabled()", {}, p.bool),
    maxDeposit: viewFun("0x402d267d", "maxDeposit(address)", {"_0": p.address}, p.uint256),
    maxMint: viewFun("0xc63d75b6", "maxMint(address)", {"_0": p.address}, p.uint256),
    maxRedeem: viewFun("0xd905777e", "maxRedeem(address)", {"owner": p.address}, p.uint256),
    maxWithdraw: viewFun("0xce96cb77", "maxWithdraw(address)", {"owner": p.address}, p.uint256),
    mint: fun("0x73c02519", "mint(uint256,address,bytes)", {"shares": p.uint256, "receiver": p.address, "signature": p.bytes}, p.uint256),
    name: viewFun("0x06fdde03", "name()", {}, p.string),
    nextOptionId: viewFun("0x9215abb0", "nextOptionId()", {}, p.uint256),
    nonces: viewFun("0x7ecebe00", "nonces(address)", {"holder": p.address}, p.uint256),
    owner: viewFun("0x8da5cb5b", "owner()", {}, p.address),
    previewDeposit: viewFun("0xef8b30f7", "previewDeposit(uint256)", {"assets": p.uint256}, p.uint256),
    previewMint: viewFun("0xb3d7f6b9", "previewMint(uint256)", {"shares": p.uint256}, p.uint256),
    previewRedeem: viewFun("0x4cdad506", "previewRedeem(uint256)", {"shares": p.uint256}, p.uint256),
    previewWithdraw: viewFun("0x0a28a477", "previewWithdraw(uint256)", {"assets": p.uint256}, p.uint256),
    protocolRevenues: viewFun("0x39a73c03", "protocolRevenues(address)", {"asset": p.address}, p.uint128),
    proxiableUUID: viewFun("0x52d1902d", "proxiableUUID()", {}, p.bytes32),
    redeem: fun("0x87515b90", "redeem(uint256,address,address,bytes)", {"shares": p.uint256, "receiver": p.address, "owner": p.address, "signature": p.bytes}, p.uint256),
    renounceOwnership: fun("0x715018a6", "renounceOwnership()", {}, ),
    setController: fun("0x92eefe9b", "setController(address)", {"newController": p.address}, ),
    setIsSignatureValidationEnabled: fun("0xddfe22aa", "setIsSignatureValidationEnabled(bool)", {"status": p.bool}, ),
    settleOption: fun("0x80da69de", "settleOption(uint256,bytes[])", {"optionId": p.uint256, "priceUpdateData": p.array(p.bytes)}, ),
    symbol: viewFun("0x95d89b41", "symbol()", {}, p.string),
    totalAssets: viewFun("0x01e1d114", "totalAssets()", {}, p.uint256),
    totalLiquidAssets: viewFun("0xcadd1ec9", "totalLiquidAssets()", {}, p.uint256),
    totalLockedAssets: viewFun("0x2e940388", "totalLockedAssets()", {}, p.uint256),
    totalSupply: viewFun("0x18160ddd", "totalSupply()", {}, p.uint256),
    transfer: fun("0xa9059cbb", "transfer(address,uint256)", {"to": p.address, "value": p.uint256}, p.bool),
    transferFrom: fun("0x23b872dd", "transferFrom(address,address,uint256)", {"from": p.address, "to": p.address, "value": p.uint256}, p.bool),
    transferOwnership: fun("0xf2fde38b", "transferOwnership(address)", {"newOwner": p.address}, ),
    upgradeToAndCall: fun("0x4f1ef286", "upgradeToAndCall(address,bytes)", {"newImplementation": p.address, "data": p.bytes}, ),
    verifySignature: viewFun("0x9e5a897d", "verifySignature((bool,address,address,uint256,uint256,uint256,uint256,bytes))", {"params": p.struct({"isPut": p.bool, "base": p.address, "quote": p.address, "strike": p.uint256, "quantity": p.uint256, "premium": p.uint256, "expiration": p.uint256, "signature": p.bytes})}, p.bool),
    withdraw: fun("0xa7b7e988", "withdraw(uint256,address,address,bytes)", {"assets": p.uint256, "receiver": p.address, "owner": p.address, "signature": p.bytes}, p.uint256),
    writeOption: fun("0x39cbce38", "writeOption((bool,uint256,uint256,uint256,uint256,address,address,address,bytes),bytes[])", {"params": p.struct({"isPut": p.bool, "strike": p.uint256, "quantity": p.uint256, "premium": p.uint256, "expiration": p.uint256, "holder": p.address, "base": p.address, "quote": p.address, "signature": p.bytes}), "priceUpdateData": p.array(p.bytes)}, p.uint256),
}

export class Contract extends ContractBase {

    MAX_FEE() {
        return this.eth_call(functions.MAX_FEE, {})
    }

    UPGRADE_INTERFACE_VERSION() {
        return this.eth_call(functions.UPGRADE_INTERFACE_VERSION, {})
    }

    _options(id: _optionsParams["id"]) {
        return this.eth_call(functions._options, {id})
    }

    allowance(owner: AllowanceParams["owner"], spender: AllowanceParams["spender"]) {
        return this.eth_call(functions.allowance, {owner, spender})
    }

    asset() {
        return this.eth_call(functions.asset, {})
    }

    balanceOf(account: BalanceOfParams["account"]) {
        return this.eth_call(functions.balanceOf, {account})
    }

    controller() {
        return this.eth_call(functions.controller, {})
    }

    convertToAssets(shares: ConvertToAssetsParams["shares"]) {
        return this.eth_call(functions.convertToAssets, {shares})
    }

    convertToShares(assets: ConvertToSharesParams["assets"]) {
        return this.eth_call(functions.convertToShares, {assets})
    }

    cumulatedDeposit() {
        return this.eth_call(functions.cumulatedDeposit, {})
    }

    cumulatedWithdraw() {
        return this.eth_call(functions.cumulatedWithdraw, {})
    }

    decimals() {
        return this.eth_call(functions.decimals, {})
    }

    getNonce(user: GetNonceParams["user"]) {
        return this.eth_call(functions.getNonce, {user})
    }

    isSignatureValidationEnabled() {
        return this.eth_call(functions.isSignatureValidationEnabled, {})
    }

    maxDeposit(_0: MaxDepositParams["_0"]) {
        return this.eth_call(functions.maxDeposit, {_0})
    }

    maxMint(_0: MaxMintParams["_0"]) {
        return this.eth_call(functions.maxMint, {_0})
    }

    maxRedeem(owner: MaxRedeemParams["owner"]) {
        return this.eth_call(functions.maxRedeem, {owner})
    }

    maxWithdraw(owner: MaxWithdrawParams["owner"]) {
        return this.eth_call(functions.maxWithdraw, {owner})
    }

    name() {
        return this.eth_call(functions.name, {})
    }

    nextOptionId() {
        return this.eth_call(functions.nextOptionId, {})
    }

    nonces(holder: NoncesParams["holder"]) {
        return this.eth_call(functions.nonces, {holder})
    }

    owner() {
        return this.eth_call(functions.owner, {})
    }

    previewDeposit(assets: PreviewDepositParams["assets"]) {
        return this.eth_call(functions.previewDeposit, {assets})
    }

    previewMint(shares: PreviewMintParams["shares"]) {
        return this.eth_call(functions.previewMint, {shares})
    }

    previewRedeem(shares: PreviewRedeemParams["shares"]) {
        return this.eth_call(functions.previewRedeem, {shares})
    }

    previewWithdraw(assets: PreviewWithdrawParams["assets"]) {
        return this.eth_call(functions.previewWithdraw, {assets})
    }

    protocolRevenues(asset: ProtocolRevenuesParams["asset"]) {
        return this.eth_call(functions.protocolRevenues, {asset})
    }

    proxiableUUID() {
        return this.eth_call(functions.proxiableUUID, {})
    }

    symbol() {
        return this.eth_call(functions.symbol, {})
    }

    totalAssets() {
        return this.eth_call(functions.totalAssets, {})
    }

    totalLiquidAssets() {
        return this.eth_call(functions.totalLiquidAssets, {})
    }

    totalLockedAssets() {
        return this.eth_call(functions.totalLockedAssets, {})
    }

    totalSupply() {
        return this.eth_call(functions.totalSupply, {})
    }

    verifySignature(params: VerifySignatureParams["params"]) {
        return this.eth_call(functions.verifySignature, {params})
    }
}

/// Event types
export type ApprovalEventArgs = EParams<typeof events.Approval>
export type ClaimProtocolRevenuesEventArgs = EParams<typeof events.ClaimProtocolRevenues>
export type DepositEventArgs = EParams<typeof events.Deposit>
export type InitializedEventArgs = EParams<typeof events.Initialized>
export type OwnershipTransferredEventArgs = EParams<typeof events.OwnershipTransferred>
export type SetControllerEventArgs = EParams<typeof events.SetController>
export type SettleOptionEventArgs = EParams<typeof events.SettleOption>
export type TransferEventArgs = EParams<typeof events.Transfer>
export type UpgradedEventArgs = EParams<typeof events.Upgraded>
export type WithdrawEventArgs = EParams<typeof events.Withdraw>
export type WriteOptionEventArgs = EParams<typeof events.WriteOption>

/// Function types
export type MAX_FEEParams = FunctionArguments<typeof functions.MAX_FEE>
export type MAX_FEEReturn = FunctionReturn<typeof functions.MAX_FEE>

export type UPGRADE_INTERFACE_VERSIONParams = FunctionArguments<typeof functions.UPGRADE_INTERFACE_VERSION>
export type UPGRADE_INTERFACE_VERSIONReturn = FunctionReturn<typeof functions.UPGRADE_INTERFACE_VERSION>

export type _optionsParams = FunctionArguments<typeof functions._options>
export type _optionsReturn = FunctionReturn<typeof functions._options>

export type AllowanceParams = FunctionArguments<typeof functions.allowance>
export type AllowanceReturn = FunctionReturn<typeof functions.allowance>

export type ApproveParams = FunctionArguments<typeof functions.approve>
export type ApproveReturn = FunctionReturn<typeof functions.approve>

export type AssetParams = FunctionArguments<typeof functions.asset>
export type AssetReturn = FunctionReturn<typeof functions.asset>

export type BalanceOfParams = FunctionArguments<typeof functions.balanceOf>
export type BalanceOfReturn = FunctionReturn<typeof functions.balanceOf>

export type ClaimProtocolRevenuesParams = FunctionArguments<typeof functions.claimProtocolRevenues>
export type ClaimProtocolRevenuesReturn = FunctionReturn<typeof functions.claimProtocolRevenues>

export type ControllerParams = FunctionArguments<typeof functions.controller>
export type ControllerReturn = FunctionReturn<typeof functions.controller>

export type ConvertToAssetsParams = FunctionArguments<typeof functions.convertToAssets>
export type ConvertToAssetsReturn = FunctionReturn<typeof functions.convertToAssets>

export type ConvertToSharesParams = FunctionArguments<typeof functions.convertToShares>
export type ConvertToSharesReturn = FunctionReturn<typeof functions.convertToShares>

export type CumulatedDepositParams = FunctionArguments<typeof functions.cumulatedDeposit>
export type CumulatedDepositReturn = FunctionReturn<typeof functions.cumulatedDeposit>

export type CumulatedWithdrawParams = FunctionArguments<typeof functions.cumulatedWithdraw>
export type CumulatedWithdrawReturn = FunctionReturn<typeof functions.cumulatedWithdraw>

export type DecimalsParams = FunctionArguments<typeof functions.decimals>
export type DecimalsReturn = FunctionReturn<typeof functions.decimals>

export type DepositParams = FunctionArguments<typeof functions.deposit>
export type DepositReturn = FunctionReturn<typeof functions.deposit>

export type GetDataFeedLatestAnswerPythParams = FunctionArguments<typeof functions.getDataFeedLatestAnswerPyth>
export type GetDataFeedLatestAnswerPythReturn = FunctionReturn<typeof functions.getDataFeedLatestAnswerPyth>

export type GetNonceParams = FunctionArguments<typeof functions.getNonce>
export type GetNonceReturn = FunctionReturn<typeof functions.getNonce>

export type InitializeParams = FunctionArguments<typeof functions.initialize>
export type InitializeReturn = FunctionReturn<typeof functions.initialize>

export type IsSignatureValidationEnabledParams = FunctionArguments<typeof functions.isSignatureValidationEnabled>
export type IsSignatureValidationEnabledReturn = FunctionReturn<typeof functions.isSignatureValidationEnabled>

export type MaxDepositParams = FunctionArguments<typeof functions.maxDeposit>
export type MaxDepositReturn = FunctionReturn<typeof functions.maxDeposit>

export type MaxMintParams = FunctionArguments<typeof functions.maxMint>
export type MaxMintReturn = FunctionReturn<typeof functions.maxMint>

export type MaxRedeemParams = FunctionArguments<typeof functions.maxRedeem>
export type MaxRedeemReturn = FunctionReturn<typeof functions.maxRedeem>

export type MaxWithdrawParams = FunctionArguments<typeof functions.maxWithdraw>
export type MaxWithdrawReturn = FunctionReturn<typeof functions.maxWithdraw>

export type MintParams = FunctionArguments<typeof functions.mint>
export type MintReturn = FunctionReturn<typeof functions.mint>

export type NameParams = FunctionArguments<typeof functions.name>
export type NameReturn = FunctionReturn<typeof functions.name>

export type NextOptionIdParams = FunctionArguments<typeof functions.nextOptionId>
export type NextOptionIdReturn = FunctionReturn<typeof functions.nextOptionId>

export type NoncesParams = FunctionArguments<typeof functions.nonces>
export type NoncesReturn = FunctionReturn<typeof functions.nonces>

export type OwnerParams = FunctionArguments<typeof functions.owner>
export type OwnerReturn = FunctionReturn<typeof functions.owner>

export type PreviewDepositParams = FunctionArguments<typeof functions.previewDeposit>
export type PreviewDepositReturn = FunctionReturn<typeof functions.previewDeposit>

export type PreviewMintParams = FunctionArguments<typeof functions.previewMint>
export type PreviewMintReturn = FunctionReturn<typeof functions.previewMint>

export type PreviewRedeemParams = FunctionArguments<typeof functions.previewRedeem>
export type PreviewRedeemReturn = FunctionReturn<typeof functions.previewRedeem>

export type PreviewWithdrawParams = FunctionArguments<typeof functions.previewWithdraw>
export type PreviewWithdrawReturn = FunctionReturn<typeof functions.previewWithdraw>

export type ProtocolRevenuesParams = FunctionArguments<typeof functions.protocolRevenues>
export type ProtocolRevenuesReturn = FunctionReturn<typeof functions.protocolRevenues>

export type ProxiableUUIDParams = FunctionArguments<typeof functions.proxiableUUID>
export type ProxiableUUIDReturn = FunctionReturn<typeof functions.proxiableUUID>

export type RedeemParams = FunctionArguments<typeof functions.redeem>
export type RedeemReturn = FunctionReturn<typeof functions.redeem>

export type RenounceOwnershipParams = FunctionArguments<typeof functions.renounceOwnership>
export type RenounceOwnershipReturn = FunctionReturn<typeof functions.renounceOwnership>

export type SetControllerParams = FunctionArguments<typeof functions.setController>
export type SetControllerReturn = FunctionReturn<typeof functions.setController>

export type SetIsSignatureValidationEnabledParams = FunctionArguments<typeof functions.setIsSignatureValidationEnabled>
export type SetIsSignatureValidationEnabledReturn = FunctionReturn<typeof functions.setIsSignatureValidationEnabled>

export type SettleOptionParams = FunctionArguments<typeof functions.settleOption>
export type SettleOptionReturn = FunctionReturn<typeof functions.settleOption>

export type SymbolParams = FunctionArguments<typeof functions.symbol>
export type SymbolReturn = FunctionReturn<typeof functions.symbol>

export type TotalAssetsParams = FunctionArguments<typeof functions.totalAssets>
export type TotalAssetsReturn = FunctionReturn<typeof functions.totalAssets>

export type TotalLiquidAssetsParams = FunctionArguments<typeof functions.totalLiquidAssets>
export type TotalLiquidAssetsReturn = FunctionReturn<typeof functions.totalLiquidAssets>

export type TotalLockedAssetsParams = FunctionArguments<typeof functions.totalLockedAssets>
export type TotalLockedAssetsReturn = FunctionReturn<typeof functions.totalLockedAssets>

export type TotalSupplyParams = FunctionArguments<typeof functions.totalSupply>
export type TotalSupplyReturn = FunctionReturn<typeof functions.totalSupply>

export type TransferParams = FunctionArguments<typeof functions.transfer>
export type TransferReturn = FunctionReturn<typeof functions.transfer>

export type TransferFromParams = FunctionArguments<typeof functions.transferFrom>
export type TransferFromReturn = FunctionReturn<typeof functions.transferFrom>

export type TransferOwnershipParams = FunctionArguments<typeof functions.transferOwnership>
export type TransferOwnershipReturn = FunctionReturn<typeof functions.transferOwnership>

export type UpgradeToAndCallParams = FunctionArguments<typeof functions.upgradeToAndCall>
export type UpgradeToAndCallReturn = FunctionReturn<typeof functions.upgradeToAndCall>

export type VerifySignatureParams = FunctionArguments<typeof functions.verifySignature>
export type VerifySignatureReturn = FunctionReturn<typeof functions.verifySignature>

export type WithdrawParams = FunctionArguments<typeof functions.withdraw>
export type WithdrawReturn = FunctionReturn<typeof functions.withdraw>

export type WriteOptionParams = FunctionArguments<typeof functions.writeOption>
export type WriteOptionReturn = FunctionReturn<typeof functions.writeOption>

