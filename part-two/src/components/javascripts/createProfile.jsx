import React from "react";
import { useState,useEffect } from "react";
import Web3 from 'web3';
import NFTravelABI from "../solidity/ABI/NFTravelABI.json";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import { config } from "@onflow/fcl";
import setNFTUser from "../cadence/transactions/setNFTUser";

config({
  "accessNode.api": "https://access-testnet.onflow.org",
  "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn"
});

const contractAddress = '0x3E04Ef80CC52C61f26CE61b665f71B483363Dc78';

function CreateProfile() {

    const [user, setUser] = useState();
    const [ownerAddr, setOwnerAddr] = useState(null);
    const [setUpSuccessful, setSetUpSuccessful] = useState(false);
    const [isAuthenticated,setIsAuthenticated] = useState(false);
    const [name, setName] = useState('');
    const [dateOfJoining, setDateOfJoining] = useState('');
    const [web3, setWeb3] = useState(null);
    const [accounts, setAccounts] = useState([]);
    const [contract, setContract] = useState(null);
    useEffect(() => {
        const initialize = async () => {
          // Check if web3 is injected by the browser (Mist/MetaMask)
          if (typeof window.ethereum !== 'undefined') {
            try {
              // Request account access
              await window.ethereum.request({ method: 'eth_requestAccounts' });
              const web3 = new Web3(window.ethereum);
              setWeb3(web3);
    
              // Get the user's accounts
              const accounts = await web3.eth.getAccounts();
              setAccounts(accounts);
    
              // Get the contract instance
              const contract = new web3.eth.Contract(NFTravelABI, contractAddress);
              setContract(contract);  
    
            } catch (error) {
              console.error('Error initializing Web3:', error);
              alert('An error occurred while initializing Web3. Please make sure you have MetaMask installed and try again.');
            }
          } else {
            console.log('Please install MetaMask!');
          }
        };
    
        initialize();
      }, []);
    

  useEffect(() => {
    fcl.currentUser().subscribe(setUser);
    if (user && user.addr) {
      setOwnerAddr(user.addr);
  
    }    
  }, [user]);

  const login = async () => {
    await fcl.authenticate();
    if(user&&user.addr){console.log(user.addr);}
    setIsAuthenticated(true);
  };

  const setupUser = async () => {
    try {
      const acct = fcl.currentUser().authorization;
      const response = await fcl.send([
        fcl.transaction(setNFTUser), fcl.args([]), fcl.proposer(acct), fcl.payer(acct), fcl.authorizations([acct]), fcl.limit(9999)]).then(fcl.decode);
      if (response.errorMessage) {
        console.error("Error setting up collection:", response.errorMessage);
      } else {
        console.log("Collection set up successfully");
        await contract.methods.createPerson(name,"","","july 22,2003",user.addr.toString()).send({ from: accounts[0] });;
        console.log("User Profile Created succesfully.");
        const requestDetails = await contract.methods.GetPersonDetails(user.addr.toString());
        console.log(requestDetails);
        setSetUpSuccessful(true);
      }

    } catch (error) {
      console.log("Error in transaction:", error);
      alert("Error in transaction.");
    }
  };

  return(<div>
    {!isAuthenticated&& (<div>
        <button onClick={login}>Before we begin, please click here to verify your authority.</button>
    </div>)}

    {isAuthenticated &&(<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <h2 style={{ marginBottom: '20px' }}>User Details</h2>
    <form onSubmit={setupUser} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginBottom: '10px', padding: '5px' }}
      />

      <label htmlFor="dateOfJoining">Date of Joining:</label>
      <input
        type="date"
        id="dateOfJoining"
        value={dateOfJoining}
        onChange={(e) => setDateOfJoining(e.target.value)}
        style={{ marginBottom: '10px', padding: '5px' }}
      />

      <button onClick={setupUser} style={{ padding: '10px 20px', backgroundColor: 'blue', color: 'white', border: 'none' }}>
        Submit
      </button>
    </form>
  </div>) }




  </div>
    

  )

    
}

export default CreateProfile;