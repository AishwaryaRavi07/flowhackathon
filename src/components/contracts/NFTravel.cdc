import NonFungibleToken from 0x631e88ae7f1d7c20

pub contract NFTravel : NonFungibleToken {

    pub var totalSupply: UInt64


    pub event ContractInitialized()   
    pub event Withdraw(id: UInt64, from: Address?)
    pub event Deposit(id: UInt64, to: Address?)

    init(){
        self.totalSupply = 0  
        emit ContractInitialized()
    }

    pub resource interface OwnerHistory{    
      pub fun getOwnershipHistory():{UInt64:Address}
    
    }



 pub resource NFT: NonFungibleToken.INFT,OwnerHistory{
    pub let id: UInt64
    pub var ipfsHash: String
    pub var TicketSource: String
    pub var TicketDestination: String
    pub var TicketDate: String
    pub var TicketTime: String
    pub var OwnershipHistory: {UInt64: Address}

    init(source: String, destination: String, owneraddress: Address, date: String, time: String, hash: String) {
        self.id = NFTravel.totalSupply
        self.TicketSource = source
        self.TicketDestination = destination
        self.TicketDate = date
        self.TicketTime = time
        self.OwnershipHistory = {1: owneraddress}
        self.ipfsHash = hash        
        NFTravel.totalSupply = NFTravel.totalSupply + 1
    }

      pub fun getOwnershipHistory():{UInt64:Address}{
        return self.OwnershipHistory
            
        }
    
}
 pub resource interface CollectionPublic {
              pub fun deposit(token : @NonFungibleToken.NFT)
              pub fun getIDs():[UInt64]
              pub fun borrowNFT(id : UInt64): &NonFungibleToken.NFT
              pub fun borrowAllNFT(id:UInt64) : &NFT
            
          }




    pub resource Collection: NonFungibleToken.Receiver, NonFungibleToken.Provider, NonFungibleToken.CollectionPublic,CollectionPublic {
        pub var ownedNFTs: @{UInt64: NonFungibleToken.NFT}

        init(){
            self.ownedNFTs <- {}
        }

        pub fun deposit(token: @NonFungibleToken.NFT) {
            let myToken <- token as! @NFTravel.NFT
            emit Deposit(id: myToken.id, to: self.owner?.address)
            self.ownedNFTs[myToken.id] <-! myToken
        }
      
        pub fun withdraw(withdrawID: UInt64): @NonFungibleToken.NFT {
            let token <- self.ownedNFTs.remove(key: withdrawID) ?? panic("This Ticket does not exist")
            emit Withdraw(id: token.id, from: self.owner?.address)
            return <-token
        }
        
        pub fun getIDs(): [UInt64] {
            return self.ownedNFTs.keys
        }

       pub fun borrowNFT(id: UInt64): &NonFungibleToken.NFT {
            
                return (&self.ownedNFTs[id] as &NonFungibleToken.NFT?) ?? panic("This ticket does not exist")
            
        }

        pub fun borrowAllNFT(id: UInt64): &NFT {
            
                let ref= (&self.ownedNFTs[id] as auth &NonFungibleToken.NFT?)?? panic("Nothing exists at this index")
                return ref as! &NFT
            }

        destroy() {
        destroy self.ownedNFTs
        
        }  
    }

     pub fun createTicket (source:String,destination:String,owneraddress:Address,date:String,time:String,hash:String):@NFTravel.NFT{
        return <- create NFT (source:source,destination:destination,owneraddress:owneraddress,date:date,time:time,hash:hash)        
    }

    pub fun createEmptyCollection(): @NonFungibleToken.Collection {
        return <-create Collection()
    }
}
