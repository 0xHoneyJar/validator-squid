import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    VaultCreated: event("0x5d9c31ffa0fecffd7cf379989a3c7af252f0335e0d2a1320b55245912c781f53", "VaultCreated(address,address)", {"stakingToken": indexed(p.address), "vault": indexed(p.address)}),
}

export const functions = {
    allVaultsLength: viewFun("0x4cd18577", "allVaultsLength()", {}, p.uint256),
    createRewardsVault: fun("0x01a07617", "createRewardsVault(address)", {"stakingToken": p.address}, p.address),
    getVault: viewFun("0x0eb9af38", "getVault(address)", {"stakingToken": p.address}, p.address),
    predictRewardsVaultAddress: viewFun("0x53c0ac56", "predictRewardsVaultAddress(address)", {"stakingToken": p.address}, p.address),
}

export class Contract extends ContractBase {

    allVaultsLength() {
        return this.eth_call(functions.allVaultsLength, {})
    }

    getVault(stakingToken: GetVaultParams["stakingToken"]) {
        return this.eth_call(functions.getVault, {stakingToken})
    }

    predictRewardsVaultAddress(stakingToken: PredictRewardsVaultAddressParams["stakingToken"]) {
        return this.eth_call(functions.predictRewardsVaultAddress, {stakingToken})
    }
}

/// Event types
export type VaultCreatedEventArgs = EParams<typeof events.VaultCreated>

/// Function types
export type AllVaultsLengthParams = FunctionArguments<typeof functions.allVaultsLength>
export type AllVaultsLengthReturn = FunctionReturn<typeof functions.allVaultsLength>

export type CreateRewardsVaultParams = FunctionArguments<typeof functions.createRewardsVault>
export type CreateRewardsVaultReturn = FunctionReturn<typeof functions.createRewardsVault>

export type GetVaultParams = FunctionArguments<typeof functions.getVault>
export type GetVaultReturn = FunctionReturn<typeof functions.getVault>

export type PredictRewardsVaultAddressParams = FunctionArguments<typeof functions.predictRewardsVaultAddress>
export type PredictRewardsVaultAddressReturn = FunctionReturn<typeof functions.predictRewardsVaultAddress>

