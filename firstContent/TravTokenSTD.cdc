import NonFungibleToken from 0x631e88ae7f1d7c20

pub contract TravTokenSTD : NonFungibleToken{ 
    pub var totalSupply: UInt64

    pub event ContractInitialized()

    pub event Withdraw(id: UInt64, from: Address?)

    pub event Deposit(id: UInt64, to: Address?)

    pub resource NFT : NonFungibleToken.INFT  {
        pub let id: UInt64
              
        pub var owners: String

        init(_owners:String){
            self.id= TravTokenSTD.totalSupply
            TravTokenSTD.totalSupply = TravTokenSTD.totalSupply + 1
            self.owners=_owners
                        
        }
            
    }

          pub resource interface CollectionPublic {
              pub fun deposit(token : @NonFungibleToken.NFT)
              pub fun getIDs():[UInt64]
              pub fun borrowNFT(id : UInt64): &NonFungibleToken.NFT
              pub fun borrowAllNFT(id:UInt64) : &NFT
            
          }


           pub resource Collection: NonFungibleToken.Provider,NonFungibleToken.Receiver,NonFungibleToken.CollectionPublic,CollectionPublic {
               pub var ownedNFTs: @{UInt64 :NonFungibleToken.NFT}

               pub fun deposit(token : @NonFungibleToken.NFT){
                   let token<- token as! @TravTokenSTD.NFT
                   emit Deposit(id:token.id,to:self.owner?.address)
                   self.ownedNFTs[token.id] <-! token
                   
               }

               pub fun withdraw(withdrawID: UInt64): @NonFungibleToken.NFT{
                    let token <- self.ownedNFTs.remove(key:withdrawID)?? panic("This collection doesn't contain NFTs with that id")
                    emit Withdraw(id:token.id, from: self.owner?.address)
                    return <- token
               }

               pub fun getIDs(): [UInt64]{
                   return self.ownedNFTs.keys
               }

               pub fun borrowNFT(id: UInt64): &NonFungibleToken.NFT {
            
                return (&self.ownedNFTs[id] as &NonFungibleToken.NFT?) ?? panic("Nothing exists at this index")
            
        }
               pub fun borrowAllNFT(id: UInt64): &NFT {
            
                let ref= (&self.ownedNFTs[id] as auth &NonFungibleToken.NFT?)?? panic("Nothing exists at this index")
                return ref as! &NFT
            }

               init(){
                  self.ownedNFTs <- {}
               }

               destroy(){
                  destroy self.ownedNFTs
               }
           }

          pub fun createEmptyCollection():@NonFungibleToken.Collection {
              return <- create Collection() 
          }

          pub resource NFTMinter {
              pub fun mintNFT(owners : String): @NFT{
               return <- create NFT(_owners:owners)
               }     

               init(){
               }      
          }

          

          init(){
               self.totalSupply = 0
               emit ContractInitialized()
               self.account.save(<-create NFTMinter(), to: /storage/MyNFTMinter)
          }

}