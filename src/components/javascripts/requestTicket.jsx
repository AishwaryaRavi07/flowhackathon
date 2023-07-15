import React from "react";
import { useState,useEffect } from "react";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import { config } from "@onflow/fcl";
import { mintNFTicket } from "../cadence/transactions/mintNFTicket";
import Web3 from "web3";
import NFTravelABI from "../solidity/ABI/NFTravelABI.json";
import { useParams } from "react-router-dom";
const contractAddress = '0xd248E7c37Fa4C48253c154F81ed6a15B20F28949';

fcl.config({
    "accessNode.api": "https://access-testnet.onflow.org",
    "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn"
  });

function RequestTicket() {
    const [contract,setContract] = useState(null);
    const [web3,setWeb3] = useState(null);
    const [accounts,setAccounts] = useState(null);
    const [isLoading,setIsLoading] = useState(false);
    const [source, setSource] = useState("");
    const [destination, setDestination] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [ipfsHash, setIpfsHash] = useState("");

    const {flowAddr} = useParams();



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
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const transactionID = await fcl.send([
            fcl.transaction(mintNFTicket),
            fcl.args([
              fcl.arg(source, t.String),
              fcl.arg(destination, t.String),
              fcl.arg(flowAddr, t.Address),
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

        try {
            await contract.methods.createTicket().send({from: accounts[0]});
            
        } catch (error) {
            console.log("Error in metamask transaction: ",error);
            alert("Error in metamask transaction.");
            
        }
      };
    
      return (
        <div>
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
       
         
        </div>
      );
    }

export default RequestTicket;