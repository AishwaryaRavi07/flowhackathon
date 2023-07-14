export const mintNFTicket = `
import NFTravel from 0x2003435419cf0c8c

transaction(source:String, destination:String,owneraddress:Address,date:String,time:String,hash:String) {

  prepare(acct: AuthAccount) {
    let collection = acct.borrow<&NFTravel.Collection>(from: /storage/NFTravelCollection)
                        ?? panic("This collection does not exist here")

    let nft <- NFTravel.createTicket(source: source, destination: destination, owneraddress: owneraddress, date: date, time: time, hash: hash)

    collection.deposit(token: <- nft)
  }

  execute {
    log("A user minted an NFT into their account")
  }
}
`