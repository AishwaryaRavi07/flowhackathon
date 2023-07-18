const setNFTUser = `
import NFTravel from 0x2003435419cf0c8c
import NonFungibleToken from 0x631e88ae7f1d7c20
import FungibleToken from 0x9a0766d93b6608b7
import FlowToken from 0x7e60df042a9c0868
import NFTMarketplace from 0x2003435419cf0c8c

transaction {

  prepare(acct: AuthAccount) {
    acct.save(<- NFTravel.createEmptyCollection(), to: /storage/NFTravelCollection)
    acct.link<&NFTravel.Collection{NFTravel.CollectionPublic, NonFungibleToken.CollectionPublic}>(/public/NFTravelCollection, target: /storage/NFTravelCollection)
    acct.link<&NFTravel.Collection>(/private/NFTravelCollection, target: /storage/NFTravelCollection)
    
    let NFTravelCollection = acct.getCapability<&NFTravel.Collection>(/private/NFTravelCollection)
    let FlowTokenVault = acct.getCapability<&FlowToken.Vault{FungibleToken.Receiver}>(/public/flowTokenReceiver)

    acct.save(<- NFTMarketplace.createSaleCollection(NFTravelCollection: NFTravelCollection, FlowTokenVault: FlowTokenVault), to: /storage/MySaleCollection)
    acct.link<&NFTMarketplace.SaleCollection{NFTMarketplace.SaleCollectionPublic}>(/public/MySaleCollection, target: /storage/MySaleCollection)
  }

  execute {
    log("A user stored a Collection and a SaleCollection inside their account")
  }
}

`

export default setNFTUser;