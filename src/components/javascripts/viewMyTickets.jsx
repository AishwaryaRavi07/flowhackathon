import React from "react";
import { useState,useEffect } from "react";
import Web3 from "web3";
import NFTravelABI from "../solidity/ABI/NFTravelABI.json";
import { useParams } from "react-router-dom";
const contractAddress = '0xd248E7c37Fa4C48253c154F81ed6a15B20F28949';

function ViewTicketCollection() {
    const [tickets, setTickets] = useState([]);
    const [contract,setContract] = useState(null);
    const [web3,setWeb3] = useState(null);
    const [personID,setPersonID] = useState(null);
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [pfpHash,setPFPHash] = useState("");
    const [dateofJoining,setDateOfJoining] = useState("");
    const [accounts,setAccounts] = useState(null);
    const [isLoading,setIsLoading] = useState(false);

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
              
              const personDetails = await contract.methods.GetPersonDetails(flowAddr.toString()).call();
              setPersonID(personDetails[0]);
              setName(personDetails[1]);
              setEmail(personDetails[2]);
              setPFPHash(personDetails[3]);
              setDateOfJoining(personDetails[4]);
              setTickets(personDetails[6]);

              tickets.forEach((ticket)=>{
                console.log(ticket);
              })
              
              
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

    return(
        <div>
            <h1>{flowAddr}</h1>
        </div>
    )
    
}

export default ViewTicketCollection;