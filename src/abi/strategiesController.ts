import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    Initialized: event("0x617372bc781d277bb042ad82810bc196d332ed8f1b8f4a12eac1155c4288e5d5", "Initialized(address,address,address,uint16)", {"lendingPoolAddressProvider": p.address, "stratergyPoolAddressProvider": p.address, "lendersProfitPool": p.address, "leverage": p.uint16}),
    LiquidationCallEvent: event("0xac90f874f056ae7c5080d17f31cbdfa330ec93497f7f01c44bc603338698a09c", "LiquidationCallEvent(address,uint256)", {"user": p.address, "strategyId": p.uint256}),
    StrategyPauseSet: event("0x85035207e32ab482be9e8b19b04856fd079786ebba95c879c3263bcae3112420", "StrategyPauseSet(uint256,address,bool)", {"strategyId": indexed(p.uint256), "strategyAddress": indexed(p.address), "newPauseStatus": p.bool}),
    StratergyUpdate: event("0xca9013fa4803f58b72bf2b8b4279e8d0e641ae2a21aa2c0cb8c6cd4d5a82fc6c", "StratergyUpdate(address,uint256,uint256)", {"_strategyAddress": p.address, "_strategyId": p.uint256, "updateType": p.uint256}),
    closePositionEvent: event("0x0a4efc80f5a2b172071ad7523e3708ba4f0fcd9ddd966c74925607600c237754", "closePositionEvent(address,uint256)", {"user": p.address, "strategyId": p.uint256}),
    openPositionEvent: event("0x31204f86fb366c57a9ac7a761b8df4775143d6a2401231c826f25a58f9233785", "openPositionEvent(address,uint256)", {"user": p.address, "strategyId": p.uint256}),
    updatePositionEvent: event("0x0d11befc5c5cc8f83f4493e3eafa80a7f243fb66e348fb3bd261dd745eefc3a4", "updatePositionEvent(address,uint256)", {"user": p.address, "strategyId": p.uint256}),
}

export const functions = {
    CONTROLLER_REVISION: viewFun("0x08a59f0d", "CONTROLLER_REVISION()", {}, p.uint256),
    addStrategy: fun("0x223e5479", "addStrategy(address)", {"_strategyAddress": p.address}, ),
    addressesProvider: viewFun("0xc72c4d10", "addressesProvider()", {}, p.address),
    borrowWithLeverage: fun("0xb0d5b50e", "borrowWithLeverage(address,uint256,uint16)", {"debtAsset": p.address, "borrowAmount": p.uint256, "leverage": p.uint16}, ),
    checkIfAlreadyExists: viewFun("0x289fd3e6", "checkIfAlreadyExists(address)", {"_strategyAddress": p.address}, p.bool),
    closePosition: fun("0x0e826113", "closePosition(uint256,bytes)", {"_strategyId": p.uint256, "data": p.bytes}, ),
    creditActionsGateway: fun("0xa0072ada", "creditActionsGateway(uint8,uint256,address,uint256,address,address)", {"_action": p.uint8, "_amount": p.uint256, "_creditTokenAddress": p.address, "posCreditAmount": p.uint256, "_permission": p.address, "_user": p.address}, ),
    creditReserveProfitShare: viewFun("0xb55a4c50", "creditReserveProfitShare()", {}, p.uint256),
    debtActionsGateway: fun("0xe8221df1", "debtActionsGateway(uint8,address,uint256,address,address,address,address,uint256,uint256)", {"_action": p.uint8, "receiver": p.address, "_amount": p.uint256, "debtTokenAddress": p.address, "asset": p.address, "user": p.address, "permission": p.address, "index": p.uint256, "posDebtAmount": p.uint256}, ),
    deleteStrategy: fun("0x87302037", "deleteStrategy(uint256)", {"_strategyId": p.uint256}, ),
    executeDepositOnBehalfOfStrategy: fun("0xa026c34a", "executeDepositOnBehalfOfStrategy(address,address,uint256,address,bool,uint256)", {"_strategyAddress": p.address, "_depositAsset": p.address, "_depositAmount": p.uint256, "user": p.address, "depositFromLendingPool": p.bool, "creditAmount": p.uint256}, ),
    getStrategiesCounter: viewFun("0x1bcfc303", "getStrategiesCounter()", {}, p.uint256),
    getStrategyAddress: viewFun("0x6ccf2fa7", "getStrategyAddress(uint256)", {"_strategyId": p.uint256}, p.address),
    initialize: fun("0x2e112757", "initialize(address,address,address,uint16)", {"strategyProvider": p.address, "lendingPoolAddressesProvider": p.address, "_lendersProfitManager": p.address, "_maxLeverage": p.uint16}, ),
    lendersProfitManager: viewFun("0x38652466", "lendersProfitManager()", {}, p.address),
    liquidationCall: fun("0x9bf12f64", "liquidationCall(uint256,bytes)", {"_strategyId": p.uint256, "data": p.bytes}, ),
    maxLeverage: viewFun("0xae3302c2", "maxLeverage()", {}, p.uint16),
    openPosition: fun("0x0c81ff7c", "openPosition(uint256,bytes,bytes,bytes)", {"_strategyId": p.uint256, "data1": p.bytes, "data2": p.bytes, "data3": p.bytes}, p.uint256),
    setCreditReserveProfitShare: fun("0xd2bd0aa2", "setCreditReserveProfitShare(uint256)", {"_newShare": p.uint256}, ),
    setPause: fun("0x2e253681", "setPause(uint256,bool)", {"_strategyId": p.uint256, "_pause": p.bool}, ),
    stratAddressProvider: viewFun("0x83b96e84", "stratAddressProvider()", {}, p.address),
    strategyCounter: viewFun("0xffb9feb3", "strategyCounter()", {}, p.uint256),
    transferToLendersProfitPool: fun("0xe2c4967e", "transferToLendersProfitPool(address,uint256)", {"asset": p.address, "amount": p.uint256}, ),
    updatePosition: fun("0xaf2d0b92", "updatePosition(uint256,bytes)", {"_strategyId": p.uint256, "data": p.bytes}, ),
    updateStrategy: fun("0x6aa8edb0", "updateStrategy(address,uint256)", {"_strategyAddress": p.address, "_strategyId": p.uint256}, ),
}

export class Contract extends ContractBase {

    CONTROLLER_REVISION() {
        return this.eth_call(functions.CONTROLLER_REVISION, {})
    }

    addressesProvider() {
        return this.eth_call(functions.addressesProvider, {})
    }

    checkIfAlreadyExists(_strategyAddress: CheckIfAlreadyExistsParams["_strategyAddress"]) {
        return this.eth_call(functions.checkIfAlreadyExists, {_strategyAddress})
    }

    creditReserveProfitShare() {
        return this.eth_call(functions.creditReserveProfitShare, {})
    }

    getStrategiesCounter() {
        return this.eth_call(functions.getStrategiesCounter, {})
    }

    getStrategyAddress(_strategyId: GetStrategyAddressParams["_strategyId"]) {
        return this.eth_call(functions.getStrategyAddress, {_strategyId})
    }

    lendersProfitManager() {
        return this.eth_call(functions.lendersProfitManager, {})
    }

    maxLeverage() {
        return this.eth_call(functions.maxLeverage, {})
    }

    stratAddressProvider() {
        return this.eth_call(functions.stratAddressProvider, {})
    }

    strategyCounter() {
        return this.eth_call(functions.strategyCounter, {})
    }
}

/// Event types
export type InitializedEventArgs = EParams<typeof events.Initialized>
export type LiquidationCallEventEventArgs = EParams<typeof events.LiquidationCallEvent>
export type StrategyPauseSetEventArgs = EParams<typeof events.StrategyPauseSet>
export type StratergyUpdateEventArgs = EParams<typeof events.StratergyUpdate>
export type ClosePositionEventEventArgs = EParams<typeof events.closePositionEvent>
export type OpenPositionEventEventArgs = EParams<typeof events.openPositionEvent>
export type UpdatePositionEventEventArgs = EParams<typeof events.updatePositionEvent>

/// Function types
export type CONTROLLER_REVISIONParams = FunctionArguments<typeof functions.CONTROLLER_REVISION>
export type CONTROLLER_REVISIONReturn = FunctionReturn<typeof functions.CONTROLLER_REVISION>

export type AddStrategyParams = FunctionArguments<typeof functions.addStrategy>
export type AddStrategyReturn = FunctionReturn<typeof functions.addStrategy>

export type AddressesProviderParams = FunctionArguments<typeof functions.addressesProvider>
export type AddressesProviderReturn = FunctionReturn<typeof functions.addressesProvider>

export type BorrowWithLeverageParams = FunctionArguments<typeof functions.borrowWithLeverage>
export type BorrowWithLeverageReturn = FunctionReturn<typeof functions.borrowWithLeverage>

export type CheckIfAlreadyExistsParams = FunctionArguments<typeof functions.checkIfAlreadyExists>
export type CheckIfAlreadyExistsReturn = FunctionReturn<typeof functions.checkIfAlreadyExists>

export type ClosePositionParams = FunctionArguments<typeof functions.closePosition>
export type ClosePositionReturn = FunctionReturn<typeof functions.closePosition>

export type CreditActionsGatewayParams = FunctionArguments<typeof functions.creditActionsGateway>
export type CreditActionsGatewayReturn = FunctionReturn<typeof functions.creditActionsGateway>

export type CreditReserveProfitShareParams = FunctionArguments<typeof functions.creditReserveProfitShare>
export type CreditReserveProfitShareReturn = FunctionReturn<typeof functions.creditReserveProfitShare>

export type DebtActionsGatewayParams = FunctionArguments<typeof functions.debtActionsGateway>
export type DebtActionsGatewayReturn = FunctionReturn<typeof functions.debtActionsGateway>

export type DeleteStrategyParams = FunctionArguments<typeof functions.deleteStrategy>
export type DeleteStrategyReturn = FunctionReturn<typeof functions.deleteStrategy>

export type ExecuteDepositOnBehalfOfStrategyParams = FunctionArguments<typeof functions.executeDepositOnBehalfOfStrategy>
export type ExecuteDepositOnBehalfOfStrategyReturn = FunctionReturn<typeof functions.executeDepositOnBehalfOfStrategy>

export type GetStrategiesCounterParams = FunctionArguments<typeof functions.getStrategiesCounter>
export type GetStrategiesCounterReturn = FunctionReturn<typeof functions.getStrategiesCounter>

export type GetStrategyAddressParams = FunctionArguments<typeof functions.getStrategyAddress>
export type GetStrategyAddressReturn = FunctionReturn<typeof functions.getStrategyAddress>

export type InitializeParams = FunctionArguments<typeof functions.initialize>
export type InitializeReturn = FunctionReturn<typeof functions.initialize>

export type LendersProfitManagerParams = FunctionArguments<typeof functions.lendersProfitManager>
export type LendersProfitManagerReturn = FunctionReturn<typeof functions.lendersProfitManager>

export type LiquidationCallParams = FunctionArguments<typeof functions.liquidationCall>
export type LiquidationCallReturn = FunctionReturn<typeof functions.liquidationCall>

export type MaxLeverageParams = FunctionArguments<typeof functions.maxLeverage>
export type MaxLeverageReturn = FunctionReturn<typeof functions.maxLeverage>

export type OpenPositionParams = FunctionArguments<typeof functions.openPosition>
export type OpenPositionReturn = FunctionReturn<typeof functions.openPosition>

export type SetCreditReserveProfitShareParams = FunctionArguments<typeof functions.setCreditReserveProfitShare>
export type SetCreditReserveProfitShareReturn = FunctionReturn<typeof functions.setCreditReserveProfitShare>

export type SetPauseParams = FunctionArguments<typeof functions.setPause>
export type SetPauseReturn = FunctionReturn<typeof functions.setPause>

export type StratAddressProviderParams = FunctionArguments<typeof functions.stratAddressProvider>
export type StratAddressProviderReturn = FunctionReturn<typeof functions.stratAddressProvider>

export type StrategyCounterParams = FunctionArguments<typeof functions.strategyCounter>
export type StrategyCounterReturn = FunctionReturn<typeof functions.strategyCounter>

export type TransferToLendersProfitPoolParams = FunctionArguments<typeof functions.transferToLendersProfitPool>
export type TransferToLendersProfitPoolReturn = FunctionReturn<typeof functions.transferToLendersProfitPool>

export type UpdatePositionParams = FunctionArguments<typeof functions.updatePosition>
export type UpdatePositionReturn = FunctionReturn<typeof functions.updatePosition>

export type UpdateStrategyParams = FunctionArguments<typeof functions.updateStrategy>
export type UpdateStrategyReturn = FunctionReturn<typeof functions.updateStrategy>

