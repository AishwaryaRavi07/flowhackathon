import React, { useEffect, useState } from 'react';
import { FaHome, FaStore, FaMoneyBillAlt, FaHeart, FaCogs } from 'react-icons/fa';
import { AiFillDashboard, AiOutlineWallet, AiOutlineLineChart } from 'react-icons/ai';
import { IoIosSearch } from 'react-icons/io';
import {PiAirplaneTiltDuotone} from 'react-icons/pi';
import "../stylesheets/dashboard.css";
import { Link, useParams } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { Web3Storage } from "web3.storage";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from "react-bootstrap";
import Web3 from 'web3';
import NFTravelABI from "../solidity/ABI/NFTravelABI.json";
import * as fcl from "@onflow/fcl";
import * as FCL from "@blocto/fcl";
import * as t from "@onflow/types";
import setNFTUser from "../cadence/transactions/setNFTUser";
import { FaStar } from 'react-icons/fa';
import "../stylesheets/createProfile.css";
import { FaUser, FaRegWindowClose,FaListAlt, FaCar, FaHistory, FaEnvelope,FaRegCheckSquare} from 'react-icons/fa';
import {LuRotateCw,LuRotateCcw} from "react-icons/lu";
import { RiCaravanFill } from 'react-icons/ri';
import AvatarEditor from 'react-avatar-editor';

let discoveryWalletUrl =`https://fcl-discovery.onflow.org/testnet/authn/`;
const contractAddress = "0x779bC2333f7A82382183339a56D18c81007b1D21";

function UserDashboard() {
  const [ticketData, setTicketData] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isLoading,setIsLoading] = useState(true);
  const [accounts,setAccounts] = useState([]);
  const [contract,setContract] = useState(null);
  const [web3,setWeb3] = useState(null);
  const [personID,setPersonID] = useState(0);
  const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [pfpHash,setPFPHash] = useState("");
    const [dateofJoining,setDateOfJoining] = useState("");
    const [ticketCount,setTicketCount] = useState(null);
    const [imageSrc,setImageSrc] = useState("");
const [CID,setCID] = useState("");
  const {flowAddr} = useParams();
  const windowHeight = window.innerHeight;
const avatarSize = windowHeight * 0.3;

  function getAccessToken() {
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDQ5NTg0QzFjYjQ1QzczMTQwODQ3RjY2NjBkQ0Y5MzNjODNBM2NFMjAiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODc4OTc1NDg1NzIsIm5hbWUiOiJjb21tdXRlLWlvLXBmcC1zdG9yYWdlIn0.ocUIDWupDo_fnouuAGN2rPvsA2uhd-BG_eHvWal55Ps";
  }
  
  function makeStorageClient() {
    return new Web3Storage({ token: getAccessToken() });
  }

  const retrieve = async () => {
    const client = makeStorageClient();

    try {
      if(!(CID=="")){
        const res = await client.get(CID);
        console.log(CID);

        if (!res.ok) {
          throw new Error(`Failed to get ${CID}`);
        }
        const baseWeb3StorageUrl = 'https://ipfs.io/ipfs/';
        const file = '/image.png';
        const fileName = `${baseWeb3StorageUrl}${CID}${file}`;
        setImageSrc(fileName);
        console.log(fileName);
    
      } 
     
    } catch (error) {
      console.error('Error retrieving image:', error);
    }
  };


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
              if(!(personDetails[3]=="")){
                setCID(personDetails[3]);
                await retrieve();
    
              }
              setDateOfJoining(personDetails[4]);
              //setTickets(personDetails[6]);
              setTicketCount(personDetails[6].length);

              const pdetails = Object.values(personDetails[6]);
            var TicketsList = [];
            
            for (let i = 0; i < pdetails.length; i++) {
              const obj = await contract.methods.GetTicketDetails(pdetails[i]).call();
              const ticketDetails = Object.values(obj);
              TicketsList.push({
                TicketNumber: ticketDetails[0],
                TicketSource: ticketDetails[1],
                TicketDestination: ticketDetails[2],
                TicketDate: ticketDetails[3],
                TicketTime: ticketDetails[4],
                TicketOwnershipHistory: ticketDetails[5],
                isTicketAvailable: ticketDetails[6],
                isTicketForSale: ticketDetails[7],
                salePrice: ticketDetails[8],
              });
              console.log(ticketDetails[6],ticketDetails[7]);
              
            }                  
           console.log(TicketsList);
           setTimeout(() => {
            setTickets(TicketsList);
            console.log(tickets); // Move this inside the setTimeout callback
            setIsLoading(false);
          }, 10000); // 10 seconds delay
        ;





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


//Tumhare kaam ka lag raha hai cutie 

//Haa bhai humare kaam ka hai <3


//   useEffect(() => {
//     // Fetch ticket data from API
//     const fetchTicketData = async () => {
//       try {
//         // Make API call to fetch ticket data
//         const response = await fetch('/api/tickets');
//         const data = await response.json();
//         setTicketData(data);
//       } catch (error) {
//         console.error('Error fetching ticket data:', error);
//       }
//     };

//     fetchTicketData();
//   }, []);

  const handleTicketSelection = (ticket) => {
    setSelectedTicket(ticket);
  };

  return (
    <>
    <div style={{display:"flex"}}>
    <div>
    <aside className="sidebar" style={{height:"100vh"}} >
        <div style={{display:"flex"}}>
    <PiAirplaneTiltDuotone style={{fontSize:"32px",color:"black"}}/><h2 style={{color:"black"}}>TravToken</h2>
    </div>
        <ul className="menu" style={{paddingTop:"5vh"}}>
          <li><AiFillDashboard className="menu-icon" /><a href={`/dashboard/${flowAddr}`} style={{backgroundColor:'transparent',color:'inherit',textDecoration:"none"}}>Profile</a></li>
          <li>
  <FaStore className="menu-icon" />
  <a style={{ backgroundColor: 'transparent', color: 'inherit', textDecoration: 'none' }} href={`/dashboard/NFTicketsStore/${flowAddr}`}>
    NFTickets Store
  </a>
</li>

          <li><FaMoneyBillAlt className="menu-icon" /><a style={{ backgroundColor: 'transparent', color: 'inherit', textDecoration: 'none' }} href={`/dashboard/BookanNFTicket/${flowAddr}`}>
    Book an NFTicket
  </a></li>
        </ul>
        <div className="account-details">
          <ul className="menu">
            <li><FaHome className="account-icon" /><a style={{ backgroundColor: 'transparent', color: 'inherit', textDecoration: 'none' }} href={`/dashboard/Collections/${flowAddr}`}>
            Collections</a></li>
            <li><FaCogs className="account-icon" style={{marginRight:"-0.5vw"}} /><button onClick={FCL.unauthenticate()} style={{ backgroundColor: 'transparent', color: 'inherit',textDecoration:"none",fontSize:"large"}}>Logout</button> </li>
          </ul>
        </div>
      </aside>
    </div>
    {!isLoading && (<div className="user-dashboard">
      <header>
      <h1 style={{fontWeight:'700'}}>Welcome, {name.split(" ")[0]}!</h1>
      </header>
      <div style={{
        background:"rgb(181 236 255)",
  display: 'flex',
  flexDirection: 'row',
  height: "35vh",
  border:'solid 1px black',
  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)", // Add the shadow effect here
  color:'white',
  borderRadius: "8px", // Optional: Add border-radius for a rounded corner effect
}}>
      <div style={{display:'flex',flexDirection:'column',width:'70vw',marginTop:'5vh'}}>
      <p style={{textAlign:'left',marginLeft:"2vw",color:"black",fontSize:"x-large"}}><b>Name: </b>{name}</p>
                <p style={{textAlign:'left',marginLeft:"2vw",color:"black",fontSize:"x-large"}}><b>Email:</b> {email}</p>
                {/* <p style={{textAlign:'left',marginLeft:"2vw",color:"black",fontSize:"x-large"}}><b>Profile Picture Hash: </b>{pfpHash}</p> */}
                <p style={{textAlign:'left',marginLeft:"2vw",color:"black",fontSize:"x-large"}}><b>Date of Joining: </b>{dateofJoining}</p>
                <p style={{textAlign:'left',marginLeft:"2vw",color:"black",fontSize:"x-large"}}><b>Ticket Count: </b>{ticketCount}</p>
      </div>
      {!(imageSrc=="") && (
            <div style={{ marginLeft:"-15vw",position: 'relative', marginTop:'2.5vh',border:"solid 1px black",width: '30vh', height: '30vh', borderRadius: '50%', overflow: 'hidden' }}>
            <AvatarEditor
      image={imageSrc}
      width={avatarSize}
      height={avatarSize}
      border={0}
      borderRadius={100}
      color={[255, 255, 255, 0]}
      scale={1}
    />
            </div>
          
          )}
      


      </div>
      

      {/* <div className="ticket-wallet">
                
        <h2>Ticket Wallet</h2>
        <div className="ticket-card-container">
          {ticketData.map((ticket) => (
            <div
              key={ticket.ticketNumber}
              className={`ticket-card ${selectedTicket === ticket ? 'selected' : ''}`}
              onClick={() => handleTicketSelection(ticket)}
            >
              <h3>{ticket.ticketNumber}</h3>
              <p>Date: {ticket.date}</p>
              <p>Destination: {ticket.destination}</p>
              <p>Status: {ticket.status}</p>
            </div>
          ))}
        </div>
      </div> */}

      {/* {selectedTicket && (
        <div className="trip-details">
          <h2>Trip Details</h2>
          <p>Date: {selectedTicket.date}</p>
          <p>Destination: {selectedTicket.destination}</p>
          <p>Class: {selectedTicket.class}</p>
          
        </div>
      )}

      {selectedTicket && (
        <div className="boarding-pass">
          <h2>Boarding Pass</h2>
          <p>Seat: {selectedTicket.seat}</p>
          <p>Gate: {selectedTicket.gate}</p>
          
        </div>
      )}

      <div className="trip-history">
        <h2>Trip History</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Destination</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {ticketData.map((ticket) => (
              <tr key={ticket.ticketNumber}>
                <td>{ticket.date}</td>
                <td>{ticket.destination}</td>
                <td>{ticket.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}

      <footer>
        <p>Contact support for assistance.</p>
      </footer>
    </div>)}
    
    </div>

    {isLoading && (
            <div className="loading-spinner" style={{marginTop:'-100vh',justifyContent:'center'}}>
              <div className="spinner" style={{alignSelf:'center',marginLeft:'20vw'}}></div>
            </div>
          )}
    </>
  );
}

export default UserDashboard;
