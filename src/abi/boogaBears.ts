import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    Approval: event("0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925", "Approval(address,address,uint256)", {"owner": indexed(p.address), "approved": indexed(p.address), "tokenId": indexed(p.uint256)}),
    ApprovalForAll: event("0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31", "ApprovalForAll(address,address,bool)", {"owner": indexed(p.address), "operator": indexed(p.address), "approved": p.bool}),
    BatchMetadataUpdate: event("0x6bd5c950a8d8df17f772f5af37cb3655737899cbf903264b9795592da439661c", "BatchMetadataUpdate(uint256,uint256)", {"fromTokenId": indexed(p.uint256), "toTokenId": indexed(p.uint256)}),
    ConsecutiveTransfer: event("0xdeaa91b6123d068f5821d0fb0678463d1a8a6079fe8af5de3ce5e896dcf9133d", "ConsecutiveTransfer(uint256,uint256,address,address)", {"fromTokenId": indexed(p.uint256), "toTokenId": p.uint256, "from": indexed(p.address), "to": indexed(p.address)}),
    OwnershipTransferred: event("0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0", "OwnershipTransferred(address,address)", {"previousOwner": indexed(p.address), "newOwner": indexed(p.address)}),
    SalePriceChanged: event("0xa7e52343431f792020e7cb8411a08014688ca11782fd5709fa2531b3d74ba457", "SalePriceChanged(uint256,uint256)", {"mintId": indexed(p.uint256), "newPrice": p.uint256}),
    TokensMinted: event("0x264808566929c0a2c98376a25f69f0faa85b1ce885be5fc7eee7cd639f9c0c26", "TokensMinted(address,uint256,uint256,address)", {"recipient": indexed(p.address), "amount": p.uint256, "mintId": p.uint256, "affiliate": p.address}),
    Transfer: event("0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef", "Transfer(address,address,uint256)", {"from": indexed(p.address), "to": indexed(p.address), "tokenId": indexed(p.uint256)}),
}

export const functions = {
    activeMintGroups: viewFun("0x483f0a82", "activeMintGroups(uint256)", {"_0": p.uint256}, p.uint256),
    addTopresale: fun("0x20704c5a", "addTopresale(address[],uint256)", {"newPresale": p.array(p.address), "mintId": p.uint256}, ),
    affiliatePercentage: viewFun("0x91a57544", "affiliatePercentage()", {}, p.uint256),
    airdropNFTs: fun("0xe213b5f6", "airdropNFTs(address[],uint256[])", {"recipients": p.array(p.address), "amounts": p.array(p.uint256)}, ),
    approve: fun("0x095ea7b3", "approve(address,uint256)", {"to": p.address, "tokenId": p.uint256}, ),
    balanceOf: viewFun("0x70a08231", "balanceOf(address)", {"owner": p.address}, p.uint256),
    baseURI: viewFun("0x6c0360eb", "baseURI()", {}, p.string),
    batchMint: fun("0x3ef009ef", "batchMint(uint256,uint256,address)", {"amount": p.uint256, "mintId": p.uint256, "affiliate": p.address}, ),
    changeMintStatus: fun("0xa8ddf8f6", "changeMintStatus(bool)", {"status": p.bool}, ),
    changeSalePrice: fun("0xc82e474b", "changeSalePrice(uint256,uint256)", {"newMintPrice": p.uint256, "mintId": p.uint256}, ),
    checkPendingBalance: viewFun("0xfea414b6", "checkPendingBalance()", {}, p.uint256),
    feeAddress: viewFun("0x41275358", "feeAddress()", {}, p.address),
    getApproved: viewFun("0x081812fc", "getApproved(uint256)", {"tokenId": p.uint256}, p.address),
    isApprovedForAll: viewFun("0xe985e9c5", "isApprovedForAll(address,address)", {"owner": p.address, "operator": p.address}, p.bool),
    maxMintPerWallet: viewFun("0x16da3bc6", "maxMintPerWallet(uint256)", {"_0": p.uint256}, p.uint256),
    maxSupply: viewFun("0xd5abeb01", "maxSupply()", {}, p.uint256),
    maxSupplyPerMintGroup: viewFun("0x24a663c3", "maxSupplyPerMintGroup(uint256)", {"_0": p.uint256}, p.uint256),
    mintGroupMints: viewFun("0xe5fd1145", "mintGroupMints(uint256)", {"_0": p.uint256}, p.uint256),
    mintLive: viewFun("0xe8656fcc", "mintLive()", {}, p.bool),
    mintPrice: viewFun("0xe6a72acf", "mintPrice(uint256)", {"_0": p.uint256}, p.uint256),
    name: viewFun("0x06fdde03", "name()", {}, p.string),
    owner: viewFun("0x8da5cb5b", "owner()", {}, p.address),
    ownerOf: viewFun("0x6352211e", "ownerOf(uint256)", {"tokenId": p.uint256}, p.address),
    ownerPayoutAddress: viewFun("0xae4e4942", "ownerPayoutAddress()", {}, p.address),
    presale: viewFun("0x7c2003e3", "presale(uint256,address)", {"_0": p.uint256, "_1": p.address}, p.bool),
    presaleActive: viewFun("0x4a5bd2fd", "presaleActive(uint256)", {"_0": p.uint256}, p.bool),
    presaleCount: viewFun("0xcde27a35", "presaleCount()", {}, p.uint256),
    removeFrompresale: fun("0x21af27f6", "removeFrompresale(address[],uint256)", {"removePresale": p.array(p.address), "mintId": p.uint256}, ),
    renounceOwnership: fun("0x715018a6", "renounceOwnership()", {}, ),
    'safeTransferFrom(address,address,uint256)': fun("0x42842e0e", "safeTransferFrom(address,address,uint256)", {"from": p.address, "to": p.address, "tokenId": p.uint256}, ),
    'safeTransferFrom(address,address,uint256,bytes)': fun("0xb88d4fde", "safeTransferFrom(address,address,uint256,bytes)", {"from": p.address, "to": p.address, "tokenId": p.uint256, "_data": p.bytes}, ),
    setAffiliatePercentage: fun("0xfac5dbc6", "setAffiliatePercentage(uint256)", {"_percentageOfMint": p.uint256}, ),
    setApprovalForAll: fun("0xa22cb465", "setApprovalForAll(address,bool)", {"operator": p.address, "approved": p.bool}, ),
    setBaseURI: fun("0x55f804b3", "setBaseURI(string)", {"newBaseURI": p.string}, ),
    setMaxMintPerWallet: fun("0x7bd4f071", "setMaxMintPerWallet(uint256,uint256)", {"newMaxMintPerWallet": p.uint256, "mintGroupId": p.uint256}, ),
    setNewMaxPerMintGroup: fun("0x11f7acb9", "setNewMaxPerMintGroup(uint256,uint256)", {"mintId": p.uint256, "newMax": p.uint256}, ),
    stopOrStartpresaleMint: fun("0xb3978a86", "stopOrStartpresaleMint(bool,uint256)", {"presaleStatus": p.bool, "mintId": p.uint256}, ),
    supportsInterface: viewFun("0x01ffc9a7", "supportsInterface(bytes4)", {"interfaceId": p.bytes4}, p.bool),
    symbol: viewFun("0x95d89b41", "symbol()", {}, p.string),
    threeDollarsEth: viewFun("0xce55c66a", "threeDollarsEth()", {}, p.uint256),
    tokenURI: viewFun("0xc87b56dd", "tokenURI(uint256)", {"tokenId": p.uint256}, p.string),
    totalSupply: viewFun("0x18160ddd", "totalSupply()", {}, p.uint256),
    transferFrom: fun("0x23b872dd", "transferFrom(address,address,uint256)", {"from": p.address, "to": p.address, "tokenId": p.uint256}, ),
    transferOwnership: fun("0xf2fde38b", "transferOwnership(address)", {"newOwner": p.address}, ),
    withdrawAffiliateMintFunds: fun("0xc20f388f", "withdrawAffiliateMintFunds()", {}, ),
    withdrawFeeFunds: fun("0xa75c3ad9", "withdrawFeeFunds()", {}, ),
    withdrawMintFunds: fun("0x905d7b33", "withdrawMintFunds()", {}, ),
}

export class Contract extends ContractBase {

    activeMintGroups(_0: ActiveMintGroupsParams["_0"]) {
        return this.eth_call(functions.activeMintGroups, {_0})
    }

    affiliatePercentage() {
        return this.eth_call(functions.affiliatePercentage, {})
    }

    balanceOf(owner: BalanceOfParams["owner"]) {
        return this.eth_call(functions.balanceOf, {owner})
    }

    baseURI() {
        return this.eth_call(functions.baseURI, {})
    }

    checkPendingBalance() {
        return this.eth_call(functions.checkPendingBalance, {})
    }

    feeAddress() {
        return this.eth_call(functions.feeAddress, {})
    }

    getApproved(tokenId: GetApprovedParams["tokenId"]) {
        return this.eth_call(functions.getApproved, {tokenId})
    }

    isApprovedForAll(owner: IsApprovedForAllParams["owner"], operator: IsApprovedForAllParams["operator"]) {
        return this.eth_call(functions.isApprovedForAll, {owner, operator})
    }

    maxMintPerWallet(_0: MaxMintPerWalletParams["_0"]) {
        return this.eth_call(functions.maxMintPerWallet, {_0})
    }

    maxSupply() {
        return this.eth_call(functions.maxSupply, {})
    }

    maxSupplyPerMintGroup(_0: MaxSupplyPerMintGroupParams["_0"]) {
        return this.eth_call(functions.maxSupplyPerMintGroup, {_0})
    }

    mintGroupMints(_0: MintGroupMintsParams["_0"]) {
        return this.eth_call(functions.mintGroupMints, {_0})
    }

    mintLive() {
        return this.eth_call(functions.mintLive, {})
    }

    mintPrice(_0: MintPriceParams["_0"]) {
        return this.eth_call(functions.mintPrice, {_0})
    }

    name() {
        return this.eth_call(functions.name, {})
    }

    owner() {
        return this.eth_call(functions.owner, {})
    }

    ownerOf(tokenId: OwnerOfParams["tokenId"]) {
        return this.eth_call(functions.ownerOf, {tokenId})
    }

    ownerPayoutAddress() {
        return this.eth_call(functions.ownerPayoutAddress, {})
    }

    presale(_0: PresaleParams["_0"], _1: PresaleParams["_1"]) {
        return this.eth_call(functions.presale, {_0, _1})
    }

    presaleActive(_0: PresaleActiveParams["_0"]) {
        return this.eth_call(functions.presaleActive, {_0})
    }

    presaleCount() {
        return this.eth_call(functions.presaleCount, {})
    }

    supportsInterface(interfaceId: SupportsInterfaceParams["interfaceId"]) {
        return this.eth_call(functions.supportsInterface, {interfaceId})
    }

    symbol() {
        return this.eth_call(functions.symbol, {})
    }

    threeDollarsEth() {
        return this.eth_call(functions.threeDollarsEth, {})
    }

    tokenURI(tokenId: TokenURIParams["tokenId"]) {
        return this.eth_call(functions.tokenURI, {tokenId})
    }

    totalSupply() {
        return this.eth_call(functions.totalSupply, {})
    }
}

/// Event types
export type ApprovalEventArgs = EParams<typeof events.Approval>
export type ApprovalForAllEventArgs = EParams<typeof events.ApprovalForAll>
export type BatchMetadataUpdateEventArgs = EParams<typeof events.BatchMetadataUpdate>
export type ConsecutiveTransferEventArgs = EParams<typeof events.ConsecutiveTransfer>
export type OwnershipTransferredEventArgs = EParams<typeof events.OwnershipTransferred>
export type SalePriceChangedEventArgs = EParams<typeof events.SalePriceChanged>
export type TokensMintedEventArgs = EParams<typeof events.TokensMinted>
export type TransferEventArgs = EParams<typeof events.Transfer>

/// Function types
export type ActiveMintGroupsParams = FunctionArguments<typeof functions.activeMintGroups>
export type ActiveMintGroupsReturn = FunctionReturn<typeof functions.activeMintGroups>

export type AddTopresaleParams = FunctionArguments<typeof functions.addTopresale>
export type AddTopresaleReturn = FunctionReturn<typeof functions.addTopresale>

export type AffiliatePercentageParams = FunctionArguments<typeof functions.affiliatePercentage>
export type AffiliatePercentageReturn = FunctionReturn<typeof functions.affiliatePercentage>

export type AirdropNFTsParams = FunctionArguments<typeof functions.airdropNFTs>
export type AirdropNFTsReturn = FunctionReturn<typeof functions.airdropNFTs>

export type ApproveParams = FunctionArguments<typeof functions.approve>
export type ApproveReturn = FunctionReturn<typeof functions.approve>

export type BalanceOfParams = FunctionArguments<typeof functions.balanceOf>
export type BalanceOfReturn = FunctionReturn<typeof functions.balanceOf>

export type BaseURIParams = FunctionArguments<typeof functions.baseURI>
export type BaseURIReturn = FunctionReturn<typeof functions.baseURI>

export type BatchMintParams = FunctionArguments<typeof functions.batchMint>
export type BatchMintReturn = FunctionReturn<typeof functions.batchMint>

export type ChangeMintStatusParams = FunctionArguments<typeof functions.changeMintStatus>
export type ChangeMintStatusReturn = FunctionReturn<typeof functions.changeMintStatus>

export type ChangeSalePriceParams = FunctionArguments<typeof functions.changeSalePrice>
export type ChangeSalePriceReturn = FunctionReturn<typeof functions.changeSalePrice>

export type CheckPendingBalanceParams = FunctionArguments<typeof functions.checkPendingBalance>
export type CheckPendingBalanceReturn = FunctionReturn<typeof functions.checkPendingBalance>

export type FeeAddressParams = FunctionArguments<typeof functions.feeAddress>
export type FeeAddressReturn = FunctionReturn<typeof functions.feeAddress>

export type GetApprovedParams = FunctionArguments<typeof functions.getApproved>
export type GetApprovedReturn = FunctionReturn<typeof functions.getApproved>

export type IsApprovedForAllParams = FunctionArguments<typeof functions.isApprovedForAll>
export type IsApprovedForAllReturn = FunctionReturn<typeof functions.isApprovedForAll>

export type MaxMintPerWalletParams = FunctionArguments<typeof functions.maxMintPerWallet>
export type MaxMintPerWalletReturn = FunctionReturn<typeof functions.maxMintPerWallet>

export type MaxSupplyParams = FunctionArguments<typeof functions.maxSupply>
export type MaxSupplyReturn = FunctionReturn<typeof functions.maxSupply>

export type MaxSupplyPerMintGroupParams = FunctionArguments<typeof functions.maxSupplyPerMintGroup>
export type MaxSupplyPerMintGroupReturn = FunctionReturn<typeof functions.maxSupplyPerMintGroup>

export type MintGroupMintsParams = FunctionArguments<typeof functions.mintGroupMints>
export type MintGroupMintsReturn = FunctionReturn<typeof functions.mintGroupMints>

export type MintLiveParams = FunctionArguments<typeof functions.mintLive>
export type MintLiveReturn = FunctionReturn<typeof functions.mintLive>

export type MintPriceParams = FunctionArguments<typeof functions.mintPrice>
export type MintPriceReturn = FunctionReturn<typeof functions.mintPrice>

export type NameParams = FunctionArguments<typeof functions.name>
export type NameReturn = FunctionReturn<typeof functions.name>

export type OwnerParams = FunctionArguments<typeof functions.owner>
export type OwnerReturn = FunctionReturn<typeof functions.owner>

export type OwnerOfParams = FunctionArguments<typeof functions.ownerOf>
export type OwnerOfReturn = FunctionReturn<typeof functions.ownerOf>

export type OwnerPayoutAddressParams = FunctionArguments<typeof functions.ownerPayoutAddress>
export type OwnerPayoutAddressReturn = FunctionReturn<typeof functions.ownerPayoutAddress>

export type PresaleParams = FunctionArguments<typeof functions.presale>
export type PresaleReturn = FunctionReturn<typeof functions.presale>

export type PresaleActiveParams = FunctionArguments<typeof functions.presaleActive>
export type PresaleActiveReturn = FunctionReturn<typeof functions.presaleActive>

export type PresaleCountParams = FunctionArguments<typeof functions.presaleCount>
export type PresaleCountReturn = FunctionReturn<typeof functions.presaleCount>

export type RemoveFrompresaleParams = FunctionArguments<typeof functions.removeFrompresale>
export type RemoveFrompresaleReturn = FunctionReturn<typeof functions.removeFrompresale>

export type RenounceOwnershipParams = FunctionArguments<typeof functions.renounceOwnership>
export type RenounceOwnershipReturn = FunctionReturn<typeof functions.renounceOwnership>

export type SafeTransferFromParams_0 = FunctionArguments<typeof functions['safeTransferFrom(address,address,uint256)']>
export type SafeTransferFromReturn_0 = FunctionReturn<typeof functions['safeTransferFrom(address,address,uint256)']>

export type SafeTransferFromParams_1 = FunctionArguments<typeof functions['safeTransferFrom(address,address,uint256,bytes)']>
export type SafeTransferFromReturn_1 = FunctionReturn<typeof functions['safeTransferFrom(address,address,uint256,bytes)']>

export type SetAffiliatePercentageParams = FunctionArguments<typeof functions.setAffiliatePercentage>
export type SetAffiliatePercentageReturn = FunctionReturn<typeof functions.setAffiliatePercentage>

export type SetApprovalForAllParams = FunctionArguments<typeof functions.setApprovalForAll>
export type SetApprovalForAllReturn = FunctionReturn<typeof functions.setApprovalForAll>

export type SetBaseURIParams = FunctionArguments<typeof functions.setBaseURI>
export type SetBaseURIReturn = FunctionReturn<typeof functions.setBaseURI>

export type SetMaxMintPerWalletParams = FunctionArguments<typeof functions.setMaxMintPerWallet>
export type SetMaxMintPerWalletReturn = FunctionReturn<typeof functions.setMaxMintPerWallet>

export type SetNewMaxPerMintGroupParams = FunctionArguments<typeof functions.setNewMaxPerMintGroup>
export type SetNewMaxPerMintGroupReturn = FunctionReturn<typeof functions.setNewMaxPerMintGroup>

export type StopOrStartpresaleMintParams = FunctionArguments<typeof functions.stopOrStartpresaleMint>
export type StopOrStartpresaleMintReturn = FunctionReturn<typeof functions.stopOrStartpresaleMint>

export type SupportsInterfaceParams = FunctionArguments<typeof functions.supportsInterface>
export type SupportsInterfaceReturn = FunctionReturn<typeof functions.supportsInterface>

export type SymbolParams = FunctionArguments<typeof functions.symbol>
export type SymbolReturn = FunctionReturn<typeof functions.symbol>

export type ThreeDollarsEthParams = FunctionArguments<typeof functions.threeDollarsEth>
export type ThreeDollarsEthReturn = FunctionReturn<typeof functions.threeDollarsEth>

export type TokenURIParams = FunctionArguments<typeof functions.tokenURI>
export type TokenURIReturn = FunctionReturn<typeof functions.tokenURI>

export type TotalSupplyParams = FunctionArguments<typeof functions.totalSupply>
export type TotalSupplyReturn = FunctionReturn<typeof functions.totalSupply>

export type TransferFromParams = FunctionArguments<typeof functions.transferFrom>
export type TransferFromReturn = FunctionReturn<typeof functions.transferFrom>

export type TransferOwnershipParams = FunctionArguments<typeof functions.transferOwnership>
export type TransferOwnershipReturn = FunctionReturn<typeof functions.transferOwnership>

export type WithdrawAffiliateMintFundsParams = FunctionArguments<typeof functions.withdrawAffiliateMintFunds>
export type WithdrawAffiliateMintFundsReturn = FunctionReturn<typeof functions.withdrawAffiliateMintFunds>

export type WithdrawFeeFundsParams = FunctionArguments<typeof functions.withdrawFeeFunds>
export type WithdrawFeeFundsReturn = FunctionReturn<typeof functions.withdrawFeeFunds>

export type WithdrawMintFundsParams = FunctionArguments<typeof functions.withdrawMintFunds>
export type WithdrawMintFundsReturn = FunctionReturn<typeof functions.withdrawMintFunds>

