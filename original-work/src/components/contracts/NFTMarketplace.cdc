// NOTE: I deployed this to 0x05 in the playground
import NonFungibleToken from 0x631e88ae7f1d7c20
import NFTravel from 0x2003435419cf0c8c
import FungibleToken from 0x9a0766d93b6608b7
import FlowToken from 0x7e60df042a9c0868

pub contract NFTMarketplace {

  pub struct SaleItem {
    pub let price: UFix64
    
    pub let nftRef: &NFTravel.NFT
    
    init(_price: UFix64, _nftRef: &NFTravel.NFT) {
      self.price = _price
      self.nftRef = _nftRef
    }
  }

  pub resource interface SaleCollectionPublic {
    pub fun getIDs(): [UInt64]
    pub fun getPrice(id: UInt64): UFix64
    pub fun purchase(id: UInt64, recipientCollection: &NFTravel.Collection{NonFungibleToken.CollectionPublic}, payment: @FlowToken.Vault)
  }

  pub resource SaleCollection: SaleCollectionPublic {
    // maps the id of the NFT --> the price of that NFT
    pub var forSale: {UInt64: UFix64}
    pub let NFTravelCollection: Capability<&NFTravel.Collection>
    pub let FlowTokenVault: Capability<&FlowToken.Vault{FungibleToken.Receiver}>

    pub fun listForSale(id: UInt64, price: UFix64) {
      pre {
        price >= 0.0: "It doesn't make sense to list a token for less than 0.0"
        self.NFTravelCollection.borrow()!.getIDs().contains(id): "This SaleCollection owner does not have this NFT"
      }

      self.forSale[id] = price
    }

    pub fun unlistFromSale(id: UInt64) {
      self.forSale.remove(key: id)
    }

    pub fun purchase(id: UInt64, recipientCollection: &NFTravel.Collection{NonFungibleToken.CollectionPublic}, payment: @FlowToken.Vault) {
      pre {
        payment.balance == self.forSale[id]: "The payment is not equal to the price of the NFT"
      }

      recipientCollection.deposit(token: <- self.NFTravelCollection.borrow()!.withdraw(withdrawID: id))
      self.FlowTokenVault.borrow()!.deposit(from: <- payment)
      self.unlistFromSale(id: id)
    }

    pub fun getPrice(id: UInt64): UFix64 {
      return self.forSale[id]!
    }

    pub fun getIDs(): [UInt64] {
      return self.forSale.keys
    }

    init(_NFTravelCollection: Capability<&NFTravel.Collection>, _FlowTokenVault: Capability<&FlowToken.Vault{FungibleToken.Receiver}>) {
      self.forSale = {}
      self.NFTravelCollection = _NFTravelCollection
      self.FlowTokenVault = _FlowTokenVault
    }
  }

  pub fun createSaleCollection(NFTravelCollection: Capability<&NFTravel.Collection>, FlowTokenVault: Capability<&FlowToken.Vault{FungibleToken.Receiver}>): @SaleCollection {
    return <- create SaleCollection(_NFTravelCollection: NFTravelCollection, _FlowTokenVault: FlowTokenVault)
  }

  init() {

  }
}