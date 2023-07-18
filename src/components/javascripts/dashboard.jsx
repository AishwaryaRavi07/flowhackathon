import React from "react";
import Web3 from "web3";
import { useState,useEffect } from "react";
import * as fcl from "@onflow/fcl";
import * as fcl2 from "@blocto/fcl";
import * as t from "@onflow/types";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import NFTravelABI from "../solidity/ABI/NFTravelABI.json";
import "../stylesheets/dashboard.css";

const contractAddress = "0x779bC2333f7A82382183339a56D18c81007b1D21";

function Dashboard() {

    const {flowAddr} = useParams();

    const [web3,setWeb3] = useState(null);
    const [accounts,setAccounts] = useState([]);
    const [contract,setContract] = useState(null);
    const [isLoading,setIsLoading] = useState(true);
    const [personID,setPersonID] = useState(null);
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [pfpHash,setPFPHash] = useState("");
    const [dateofJoining,setDateOfJoining] = useState("");
    const [ticketCount,setTicketCount] = useState(null);

    const history = useHistory();


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
              //setTickets(personDetails[6]);
              setTicketCount(personDetails[6].length);
              setIsLoading(false);
    
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



    return (
        <div>
            <div className="navigation-bar">

                <button><Link to={`/my-tickets/${flowAddr}`} className="profile">View Tickets</Link></button>
                <button><Link to={`/request-ticket/${flowAddr}`} className="profile">Request Tickets</Link></button>
                <button><Link to={`/my-tickets-on-sale`} className="profile">My Tickets on Sale</Link></button>
                <button><Link to={`/all-tickets-on-sale/${flowAddr}`} className="profile">All Tickets on Sale</Link></button>
                <button onClick={()=>{fcl.unauthenticate();history.push(`/`)}}>Logout</button>
            </div>


            {!isLoading && (<div>
                <h1>Name: {name}</h1>
                <h1>Email: {email}</h1>
                <h1>Profile Picture Hash: {pfpHash}</h1>
                <h1>Date of Joining: {dateofJoining}</h1>
                <h1>Ticket Count: {ticketCount}</h1>

            </div>)}

            
      {(isLoading) &&(<div className="loading-spinner">
      <div className="spinner"></div>
    </div>) }
            
            <div>
            
            </div>
        </div>
       
    )
    
}

export default Dashboard;