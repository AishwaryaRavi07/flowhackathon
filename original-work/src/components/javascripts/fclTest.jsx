import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import { useState, useEffect } from "react";
import { mintNFTicket } from "../transactions/mintNFTicket";
import { setNFTUser } from "../transactions/setNFTUser";

fcl.config()
  .put("accessNode.api", "https://access-testnet.onflow.org")
  .put("discovery.wallet", "https://fcl-discovery.onflow.org/testnet/authn");

function FclTest() {
  const [user, setUser] = useState();
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [ipfsHash, setIpfsHash] = useState("");
  const [ownerAddr, setOwnerAddr] = useState(null);
  const [setUpSuccessful, setSetUpSuccessful] = useState(false);
  const [isAuthenticated,setIsAuthenticated] = useState(false);

  useEffect(() => {
    fcl.currentUser().subscribe(setUser);
    if (user && user.addr) {
      setOwnerAddr(user.addr);
    }
    setIpfsHash("hash");
  }, [user,ipfsHash]);

  const login = async () => {
    await fcl.authenticate();
    setIsAuthenticated(true);
  };

  const setupUser = async () => {
    try {
      const acct = fcl.currentUser().authorization;
      const response = await fcl.send([fcl.transaction(setNFTUser), fcl.args([]), fcl.proposer(acct), fcl.payer(acct), fcl.authorizations([acct]), fcl.limit(9999)]).then(fcl.decode);
      if (response.errorMessage) {
        console.error("Error setting up collection:", response.errorMessage);
      } else {
        console.log("Collection set up successfully");
        setSetUpSuccessful(true);
      }
    } catch (error) {
      console.log("Error in transaction:", error);
      alert("Error in transaction.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const transactionID = await fcl.send([
        fcl.transaction(mintNFTicket),
        fcl.args([
          fcl.arg(source, t.String),
          fcl.arg(destination, t.String),
          fcl.arg(ownerAddr, t.Address),
          fcl.arg(date, t.String),
          fcl.arg(time, t.String),
          fcl.arg(ipfsHash, t.String),
        ]),
        fcl.payer(fcl.authz),
        fcl.proposer(fcl.authz),
        fcl.authorizations([fcl.authz]),
        fcl.limit(9999),
      ])
        .then(fcl.decode)
        .catch((error) => {
          console.log("Error in transaction:", error);
          alert("Error in transaction.");
        });

      console.log("Ticket Minted with Transaction ID:", transactionID);
      // Reset form fields
      setSource("");
      setDestination("");
      setDate("");
      setTime("");

      return fcl.tx(transactionID).onceSealed();
    } catch (error) {
      console.log("Error in transaction:", error);
      alert("Error in transaction.");
    }
  };

  return (
    <div>
      <h1>Account Logged In: {(user && user.addr) ? user.addr : "None"}</h1>
      {!isAuthenticated && (<button onClick={login}>Login</button>)}
      {isAuthenticated &&(<button onClick={() => fcl.unauthenticate()}>LogOut</button>)}
      {isAuthenticated && (
        <button onClick={setupUser}>SetUp User</button>
      )}
      {setUpSuccessful &&(
         <div>
         <h1>Create Ticket</h1>
         <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
       <div style={{ marginBottom: '1rem',alignSelf:'center' }}>
         <label htmlFor="source">Source:</label>
         <input
           type="text"
           id="source"
           value={source}
           onChange={(e) => setSource(e.target.value)}
           style={{ padding: '0.5rem' }}
         />
       </div>
       <div style={{ marginBottom: '1rem' }}>
         <label htmlFor="destination">Destination:</label>
         <input
           type="text"
           id="destination"
           value={destination}
           onChange={(e) => setDestination(e.target.value)}
           style={{ padding: '0.5rem' }}
         />
       </div>
       <div style={{ marginBottom: '1rem' }}>
         <label htmlFor="date">Date:</label>
         <input
           type="text"
           id="date"
           value={date}
           onChange={(e) => setDate(e.target.value)}
           style={{ padding: '0.5rem' }}
         />
       </div>
       <div style={{ marginBottom: '1rem' }}>
         <label htmlFor="time">Time:</label>
         <input
           type="text"
           id="time"
           value={time}
           onChange={(e) => setTime(e.target.value)}
           style={{ padding: '0.5rem' }}
         />
       </div>
       <button type="submit" style={{ padding: '0.5rem 1rem',width:"10vw",alignSelf:'center'}}>Mint Ticket</button>
     </form>
       </div>
      )}
     
    </div>
  );
}

export default FclTest;
