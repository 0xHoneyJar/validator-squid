import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    Borrow: event("0xc6a898309e823ee50bac64e45ca8adba6690e99e7841c45d754e2a38e9019d9b", "Borrow(address,address,address,uint256,uint256,uint256,uint16)", {"reserve": indexed(p.address), "user": p.address, "onBehalfOf": indexed(p.address), "amount": p.uint256, "borrowRateMode": p.uint256, "borrowRate": p.uint256, "referral": indexed(p.uint16)}),
    Deposit: event("0xde6857219544bb5b7746f48ed30be6386fefc61b2f864cacf559893bf50fd951", "Deposit(address,address,address,uint256,uint16)", {"reserve": indexed(p.address), "user": p.address, "onBehalfOf": indexed(p.address), "amount": p.uint256, "referral": indexed(p.uint16)}),
    FlashLoan: event("0x631042c832b07452973831137f2d73e395028b44b250dedc5abb0ee766e168ac", "FlashLoan(address,address,address,uint256,uint256,uint16)", {"target": indexed(p.address), "initiator": indexed(p.address), "asset": indexed(p.address), "amount": p.uint256, "premium": p.uint256, "referralCode": p.uint16}),
    LiquidationCall: event("0xe413a321e8681d831f4dbccbca790d2952b56f977908e45be37335533e005286", "LiquidationCall(address,address,address,uint256,uint256,address,bool)", {"collateralAsset": indexed(p.address), "debtAsset": indexed(p.address), "user": indexed(p.address), "debtToCover": p.uint256, "liquidatedCollateralAmount": p.uint256, "liquidator": p.address, "receiveZToken": p.bool}),
    Paused: event("0x9e87fac88ff661f02d44f95383c817fece4bce600a3dab7a54406878b965e752", "Paused()", {}),
    RebalanceStableBorrowRate: event("0x9f439ae0c81e41a04d3fdfe07aed54e6a179fb0db15be7702eb66fa8ef6f5300", "RebalanceStableBorrowRate(address,address)", {"reserve": indexed(p.address), "user": indexed(p.address)}),
    Repay: event("0x4cdde6e09bb755c9a5589ebaec640bbfedff1362d4b255ebf8339782b9942faa", "Repay(address,address,address,uint256)", {"reserve": indexed(p.address), "user": indexed(p.address), "repayer": indexed(p.address), "amount": p.uint256}),
    ReserveDataUpdated: event("0x804c9b842b2748a22bb64b345453a3de7ca54a6ca45ce00d415894979e22897a", "ReserveDataUpdated(address,uint256,uint256,uint256,uint256,uint256)", {"reserve": indexed(p.address), "liquidityRate": p.uint256, "stableBorrowRate": p.uint256, "variableBorrowRate": p.uint256, "liquidityIndex": p.uint256, "variableBorrowIndex": p.uint256}),
    ReserveUsedAsCollateralDisabled: event("0x44c58d81365b66dd4b1a7f36c25aa97b8c71c361ee4937adc1a00000227db5dd", "ReserveUsedAsCollateralDisabled(address,address)", {"reserve": indexed(p.address), "user": indexed(p.address)}),
    ReserveUsedAsCollateralEnabled: event("0x00058a56ea94653cdf4f152d227ace22d4c00ad99e2a43f58cb7d9e3feb295f2", "ReserveUsedAsCollateralEnabled(address,address)", {"reserve": indexed(p.address), "user": indexed(p.address)}),
    Swap: event("0xea368a40e9570069bb8e6511d668293ad2e1f03b0d982431fd223de9f3b70ca6", "Swap(address,address,uint256)", {"reserve": indexed(p.address), "user": indexed(p.address), "rateMode": p.uint256}),
    Unpaused: event("0xa45f47fdea8a1efdd9029a5691c7f759c32b7c698632b563573e155625d16933", "Unpaused()", {}),
    Withdraw: event("0x3115d1449a7b732c986cba18244e897a450f61e1bb8d589cd2e69e6c8924f9f7", "Withdraw(address,address,address,uint256)", {"reserve": indexed(p.address), "user": indexed(p.address), "to": indexed(p.address), "amount": p.uint256}),
}

export const functions = {
    FLASHLOAN_PREMIUM_TOTAL: viewFun("0x074b2e43", "FLASHLOAN_PREMIUM_TOTAL()", {}, p.uint256),
    LENDINGPOOL_REVISION: viewFun("0x8afaff02", "LENDINGPOOL_REVISION()", {}, p.uint256),
    MAX_NUMBER_RESERVES: viewFun("0xf8119d51", "MAX_NUMBER_RESERVES()", {}, p.uint256),
    MAX_STABLE_RATE_BORROW_SIZE_PERCENT: viewFun("0xe82fec2f", "MAX_STABLE_RATE_BORROW_SIZE_PERCENT()", {}, p.uint256),
    borrow: fun("0xa415bcad", "borrow(address,uint256,uint256,uint16,address)", {"asset": p.address, "amount": p.uint256, "interestRateMode": p.uint256, "referralCode": p.uint16, "onBehalfOf": p.address}, ),
    creditActionsGateway: fun("0xcc254be8", "creditActionsGateway(uint8,address,uint256,address,address)", {"_action": p.uint8, "_user": p.address, "_amount": p.uint256, "_creditTokenAddress": p.address, "_permission": p.address}, ),
    deposit: fun("0xe8eda9df", "deposit(address,uint256,address,uint16)", {"asset": p.address, "amount": p.uint256, "onBehalfOf": p.address, "referralCode": p.uint16}, ),
    depositWithPermit: fun("0xbaf0759f", "depositWithPermit(address,uint256,address,uint16,uint256,uint8,bytes32,bytes32)", {"asset": p.address, "amount": p.uint256, "onBehalfOf": p.address, "referralCode": p.uint16, "deadline": p.uint256, "permitV": p.uint8, "permitR": p.bytes32, "permitS": p.bytes32}, ),
    enableZscore: fun("0x22781b1c", "enableZscore(address,address)", {"user": p.address, "feeAsset": p.address}, ),
    finalizeTransfer: fun("0xd5ed3933", "finalizeTransfer(address,address,address,uint256,uint256,uint256)", {"asset": p.address, "from": p.address, "to": p.address, "amount": p.uint256, "balanceFromBefore": p.uint256, "balanceToBefore": p.uint256}, ),
    flashLoan: fun("0xab9c4b5d", "flashLoan(address,address[],uint256[],uint256[],address,bytes,uint16)", {"receiverAddress": p.address, "assets": p.array(p.address), "amounts": p.array(p.uint256), "modes": p.array(p.uint256), "onBehalfOf": p.address, "params": p.bytes, "referralCode": p.uint16}, ),
    getAddressesProvider: viewFun("0xfe65acfe", "getAddressesProvider()", {}, p.address),
    getConfiguration: viewFun("0xc44b11f7", "getConfiguration(address)", {"asset": p.address}, p.struct({"data": p.uint256})),
    getReserveCount: viewFun("0x99806546", "getReserveCount()", {}, p.uint256),
    getReserveData: viewFun("0x35ea6a75", "getReserveData(address)", {"asset": p.address}, p.struct({"configuration": p.struct({"data": p.uint256}), "liquidityIndex": p.uint128, "variableBorrowIndex": p.uint128, "currentLiquidityRate": p.uint128, "currentVariableBorrowRate": p.uint128, "currentStableBorrowRate": p.uint128, "lastUpdateTimestamp": p.uint40, "zTokenAddress": p.address, "stableDebtTokenAddress": p.address, "variableDebtTokenAddress": p.address, "interestRateStrategyAddress": p.address, "creditTokensAddress": p.address, "id": p.uint8, "assetIndex": p.uint8, "reserveBorrowCap": p.uint256})),
    getReserveNormalizedIncome: viewFun("0xd15e0053", "getReserveNormalizedIncome(address)", {"asset": p.address}, p.uint256),
    getReserveNormalizedVariableDebt: viewFun("0x386497fd", "getReserveNormalizedVariableDebt(address)", {"asset": p.address}, p.uint256),
    getReservesList: viewFun("0xd1946dbc", "getReservesList()", {}, p.array(p.address)),
    getUserAccountData: viewFun("0xbf92857c", "getUserAccountData(address)", {"user": p.address}, {"totalCollateralETH": p.uint256, "totalDebtETH": p.uint256, "availableBorrowsETH": p.uint256, "currentLiquidationThreshold": p.uint256, "ltv": p.uint256, "healthFactor": p.uint256, "totalCreditInEth": p.uint256, "oldTimestamp": p.uint256}),
    getUserConfiguration: viewFun("0x4417a583", "getUserConfiguration(address)", {"user": p.address}, p.struct({"data": p.uint256, "liquidations": p.uint256, "oldTimestamp": p.uint256})),
    increaseDebt: fun("0xdd297731", "increaseDebt(address,address,uint256,address)", {"_user": p.address, "_asset": p.address, "_amount": p.uint256, "_permission": p.address}, ),
    initReserve: fun("0xac6abd4e", "initReserve(address,address,address,address,address,address)", {"asset": p.address, "zTokenAddress": p.address, "stableDebtAddress": p.address, "variableDebtAddress": p.address, "interestRateStrategyAddress": p.address, "creditTokenAddress": p.address}, ),
    initialize: fun("0x4ec81af1", "initialize(address,uint256,uint256,uint256)", {"provider": p.address, "_maxStableRateBorrowSizePercent_": p.uint256, "_flashLoanPremiumTotal_": p.uint256, "_maxNumberOfReserves_": p.uint256}, ),
    isUserBorrowingAny: viewFun("0xc7996643", "isUserBorrowingAny(address)", {"user": p.address}, p.bool),
    liquidationCall: fun("0x00a718a9", "liquidationCall(address,address,address,uint256,bool)", {"collateralAsset": p.address, "debtAsset": p.address, "user": p.address, "debtToCover": p.uint256, "receiveZToken": p.bool}, ),
    paused: viewFun("0x5c975abb", "paused()", {}, p.bool),
    repay: fun("0x573ade81", "repay(address,uint256,uint256,address)", {"asset": p.address, "amount": p.uint256, "rateMode": p.uint256, "onBehalfOf": p.address}, p.uint256),
    repayLeveraged: fun("0x3a256337", "repayLeveraged(address,address,uint256,uint256,uint256,uint256)", {"user": p.address, "asset": p.address, "amount": p.uint256, "totalDebt": p.uint256, "rateMode": p.uint256, "openPositionTimestamp": p.uint256}, p.uint256),
    repayWithPermit: fun("0xee3e210b", "repayWithPermit(address,uint256,uint256,address,uint256,uint8,bytes32,bytes32)", {"asset": p.address, "amount": p.uint256, "rateMode": p.uint256, "onBehalfOf": p.address, "deadline": p.uint256, "permitV": p.uint8, "permitR": p.bytes32, "permitS": p.bytes32}, p.uint256),
    setAssetIndex: fun("0x0be886eb", "setAssetIndex(address,uint8)", {"asset": p.address, "index": p.uint8}, ),
    setBorrowCap: fun("0xd14a0983", "setBorrowCap(address,uint256)", {"asset": p.address, "_cap": p.uint256}, ),
    setConfiguration: fun("0xb8d29276", "setConfiguration(address,uint256)", {"asset": p.address, "configuration": p.uint256}, ),
    setMaxTimeDifference: fun("0x67ecadd1", "setMaxTimeDifference(uint256)", {"maxTimeDifference": p.uint256}, ),
    setPause: fun("0xbedb86fb", "setPause(bool)", {"val": p.bool}, ),
    setReserveInterestRateStrategyAddress: fun("0x1d2118f9", "setReserveInterestRateStrategyAddress(address,address)", {"asset": p.address, "rateStrategyAddress": p.address}, ),
    setUserBorrowReserve: fun("0x4e4405e7", "setUserBorrowReserve(address,address)", {"user": p.address, "asset": p.address}, ),
    setUserUseReserveAsCollateral: fun("0x5a3b74b9", "setUserUseReserveAsCollateral(address,bool)", {"asset": p.address, "useAsCollateral": p.bool}, ),
    withdraw: fun("0x69328dec", "withdraw(address,uint256,address)", {"asset": p.address, "amount": p.uint256, "to": p.address}, p.uint256),
}

export class Contract extends ContractBase {

    FLASHLOAN_PREMIUM_TOTAL() {
        return this.eth_call(functions.FLASHLOAN_PREMIUM_TOTAL, {})
    }

    LENDINGPOOL_REVISION() {
        return this.eth_call(functions.LENDINGPOOL_REVISION, {})
    }

    MAX_NUMBER_RESERVES() {
        return this.eth_call(functions.MAX_NUMBER_RESERVES, {})
    }

    MAX_STABLE_RATE_BORROW_SIZE_PERCENT() {
        return this.eth_call(functions.MAX_STABLE_RATE_BORROW_SIZE_PERCENT, {})
    }

    getAddressesProvider() {
        return this.eth_call(functions.getAddressesProvider, {})
    }

    getConfiguration(asset: GetConfigurationParams["asset"]) {
        return this.eth_call(functions.getConfiguration, {asset})
    }

    getReserveCount() {
        return this.eth_call(functions.getReserveCount, {})
    }

    getReserveData(asset: GetReserveDataParams["asset"]) {
        return this.eth_call(functions.getReserveData, {asset})
    }

    getReserveNormalizedIncome(asset: GetReserveNormalizedIncomeParams["asset"]) {
        return this.eth_call(functions.getReserveNormalizedIncome, {asset})
    }

    getReserveNormalizedVariableDebt(asset: GetReserveNormalizedVariableDebtParams["asset"]) {
        return this.eth_call(functions.getReserveNormalizedVariableDebt, {asset})
    }

    getReservesList() {
        return this.eth_call(functions.getReservesList, {})
    }

    getUserAccountData(user: GetUserAccountDataParams["user"]) {
        return this.eth_call(functions.getUserAccountData, {user})
    }

    getUserConfiguration(user: GetUserConfigurationParams["user"]) {
        return this.eth_call(functions.getUserConfiguration, {user})
    }

    isUserBorrowingAny(user: IsUserBorrowingAnyParams["user"]) {
        return this.eth_call(functions.isUserBorrowingAny, {user})
    }

    paused() {
        return this.eth_call(functions.paused, {})
    }
}

/// Event types
export type BorrowEventArgs = EParams<typeof events.Borrow>
export type DepositEventArgs = EParams<typeof events.Deposit>
export type FlashLoanEventArgs = EParams<typeof events.FlashLoan>
export type LiquidationCallEventArgs = EParams<typeof events.LiquidationCall>
export type PausedEventArgs = EParams<typeof events.Paused>
export type RebalanceStableBorrowRateEventArgs = EParams<typeof events.RebalanceStableBorrowRate>
export type RepayEventArgs = EParams<typeof events.Repay>
export type ReserveDataUpdatedEventArgs = EParams<typeof events.ReserveDataUpdated>
export type ReserveUsedAsCollateralDisabledEventArgs = EParams<typeof events.ReserveUsedAsCollateralDisabled>
export type ReserveUsedAsCollateralEnabledEventArgs = EParams<typeof events.ReserveUsedAsCollateralEnabled>
export type SwapEventArgs = EParams<typeof events.Swap>
export type UnpausedEventArgs = EParams<typeof events.Unpaused>
export type WithdrawEventArgs = EParams<typeof events.Withdraw>

/// Function types
export type FLASHLOAN_PREMIUM_TOTALParams = FunctionArguments<typeof functions.FLASHLOAN_PREMIUM_TOTAL>
export type FLASHLOAN_PREMIUM_TOTALReturn = FunctionReturn<typeof functions.FLASHLOAN_PREMIUM_TOTAL>

export type LENDINGPOOL_REVISIONParams = FunctionArguments<typeof functions.LENDINGPOOL_REVISION>
export type LENDINGPOOL_REVISIONReturn = FunctionReturn<typeof functions.LENDINGPOOL_REVISION>

export type MAX_NUMBER_RESERVESParams = FunctionArguments<typeof functions.MAX_NUMBER_RESERVES>
export type MAX_NUMBER_RESERVESReturn = FunctionReturn<typeof functions.MAX_NUMBER_RESERVES>

export type MAX_STABLE_RATE_BORROW_SIZE_PERCENTParams = FunctionArguments<typeof functions.MAX_STABLE_RATE_BORROW_SIZE_PERCENT>
export type MAX_STABLE_RATE_BORROW_SIZE_PERCENTReturn = FunctionReturn<typeof functions.MAX_STABLE_RATE_BORROW_SIZE_PERCENT>

export type BorrowParams = FunctionArguments<typeof functions.borrow>
export type BorrowReturn = FunctionReturn<typeof functions.borrow>

export type CreditActionsGatewayParams = FunctionArguments<typeof functions.creditActionsGateway>
export type CreditActionsGatewayReturn = FunctionReturn<typeof functions.creditActionsGateway>

export type DepositParams = FunctionArguments<typeof functions.deposit>
export type DepositReturn = FunctionReturn<typeof functions.deposit>

export type DepositWithPermitParams = FunctionArguments<typeof functions.depositWithPermit>
export type DepositWithPermitReturn = FunctionReturn<typeof functions.depositWithPermit>

export type EnableZscoreParams = FunctionArguments<typeof functions.enableZscore>
export type EnableZscoreReturn = FunctionReturn<typeof functions.enableZscore>

export type FinalizeTransferParams = FunctionArguments<typeof functions.finalizeTransfer>
export type FinalizeTransferReturn = FunctionReturn<typeof functions.finalizeTransfer>

export type FlashLoanParams = FunctionArguments<typeof functions.flashLoan>
export type FlashLoanReturn = FunctionReturn<typeof functions.flashLoan>

export type GetAddressesProviderParams = FunctionArguments<typeof functions.getAddressesProvider>
export type GetAddressesProviderReturn = FunctionReturn<typeof functions.getAddressesProvider>

export type GetConfigurationParams = FunctionArguments<typeof functions.getConfiguration>
export type GetConfigurationReturn = FunctionReturn<typeof functions.getConfiguration>

export type GetReserveCountParams = FunctionArguments<typeof functions.getReserveCount>
export type GetReserveCountReturn = FunctionReturn<typeof functions.getReserveCount>

export type GetReserveDataParams = FunctionArguments<typeof functions.getReserveData>
export type GetReserveDataReturn = FunctionReturn<typeof functions.getReserveData>

export type GetReserveNormalizedIncomeParams = FunctionArguments<typeof functions.getReserveNormalizedIncome>
export type GetReserveNormalizedIncomeReturn = FunctionReturn<typeof functions.getReserveNormalizedIncome>

export type GetReserveNormalizedVariableDebtParams = FunctionArguments<typeof functions.getReserveNormalizedVariableDebt>
export type GetReserveNormalizedVariableDebtReturn = FunctionReturn<typeof functions.getReserveNormalizedVariableDebt>

export type GetReservesListParams = FunctionArguments<typeof functions.getReservesList>
export type GetReservesListReturn = FunctionReturn<typeof functions.getReservesList>

export type GetUserAccountDataParams = FunctionArguments<typeof functions.getUserAccountData>
export type GetUserAccountDataReturn = FunctionReturn<typeof functions.getUserAccountData>

export type GetUserConfigurationParams = FunctionArguments<typeof functions.getUserConfiguration>
export type GetUserConfigurationReturn = FunctionReturn<typeof functions.getUserConfiguration>

export type IncreaseDebtParams = FunctionArguments<typeof functions.increaseDebt>
export type IncreaseDebtReturn = FunctionReturn<typeof functions.increaseDebt>

export type InitReserveParams = FunctionArguments<typeof functions.initReserve>
export type InitReserveReturn = FunctionReturn<typeof functions.initReserve>

export type InitializeParams = FunctionArguments<typeof functions.initialize>
export type InitializeReturn = FunctionReturn<typeof functions.initialize>

export type IsUserBorrowingAnyParams = FunctionArguments<typeof functions.isUserBorrowingAny>
export type IsUserBorrowingAnyReturn = FunctionReturn<typeof functions.isUserBorrowingAny>

export type LiquidationCallParams = FunctionArguments<typeof functions.liquidationCall>
export type LiquidationCallReturn = FunctionReturn<typeof functions.liquidationCall>

export type PausedParams = FunctionArguments<typeof functions.paused>
export type PausedReturn = FunctionReturn<typeof functions.paused>

export type RepayParams = FunctionArguments<typeof functions.repay>
export type RepayReturn = FunctionReturn<typeof functions.repay>

export type RepayLeveragedParams = FunctionArguments<typeof functions.repayLeveraged>
export type RepayLeveragedReturn = FunctionReturn<typeof functions.repayLeveraged>

export type RepayWithPermitParams = FunctionArguments<typeof functions.repayWithPermit>
export type RepayWithPermitReturn = FunctionReturn<typeof functions.repayWithPermit>

export type SetAssetIndexParams = FunctionArguments<typeof functions.setAssetIndex>
export type SetAssetIndexReturn = FunctionReturn<typeof functions.setAssetIndex>

export type SetBorrowCapParams = FunctionArguments<typeof functions.setBorrowCap>
export type SetBorrowCapReturn = FunctionReturn<typeof functions.setBorrowCap>

export type SetConfigurationParams = FunctionArguments<typeof functions.setConfiguration>
export type SetConfigurationReturn = FunctionReturn<typeof functions.setConfiguration>

export type SetMaxTimeDifferenceParams = FunctionArguments<typeof functions.setMaxTimeDifference>
export type SetMaxTimeDifferenceReturn = FunctionReturn<typeof functions.setMaxTimeDifference>

export type SetPauseParams = FunctionArguments<typeof functions.setPause>
export type SetPauseReturn = FunctionReturn<typeof functions.setPause>

export type SetReserveInterestRateStrategyAddressParams = FunctionArguments<typeof functions.setReserveInterestRateStrategyAddress>
export type SetReserveInterestRateStrategyAddressReturn = FunctionReturn<typeof functions.setReserveInterestRateStrategyAddress>

export type SetUserBorrowReserveParams = FunctionArguments<typeof functions.setUserBorrowReserve>
export type SetUserBorrowReserveReturn = FunctionReturn<typeof functions.setUserBorrowReserve>

export type SetUserUseReserveAsCollateralParams = FunctionArguments<typeof functions.setUserUseReserveAsCollateral>
export type SetUserUseReserveAsCollateralReturn = FunctionReturn<typeof functions.setUserUseReserveAsCollateral>

export type WithdrawParams = FunctionArguments<typeof functions.withdraw>
export type WithdrawReturn = FunctionReturn<typeof functions.withdraw>

