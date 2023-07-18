import React, { useEffect, useState } from 'react';
import { FaHome, FaStore, FaMoneyBillAlt, FaHeart, FaCogs } from 'react-icons/fa';
import { AiFillDashboard, AiOutlineWallet, AiOutlineLineChart } from 'react-icons/ai';
import { IoIosSearch } from 'react-icons/io';
import {PiAirplaneTiltDuotone} from 'react-icons/pi';


function UserDashboard() {
  const [ticketData, setTicketData] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);

//Tumhare kaam ka lag raha hai cutie 


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
          <li><AiFillDashboard className="menu-icon" /> Dashboard</li>
          <li><FaStore className="menu-icon" /> NFTs Store</li>
          <li><FaMoneyBillAlt className="menu-icon" /> Active Bids</li>
          <li><FaHeart className="menu-icon" /> Favourites</li>
        </ul>
        <div className="account-details">
          <ul className="menu">
            <li><FaHome className="account-icon" /> Collections</li>
            <li><AiOutlineWallet className="account-icon" /> Wallet</li>
            <li><AiOutlineLineChart className="account-icon" /> Analytics</li>
            <li><FaCogs className="account-icon" /> Settings</li>
          </ul>
        </div>
      </aside>

    </div>
    <div className="user-dashboard">
      <header>
        <h1>Welcome, User!</h1>
        <img src="profile-picture.jpg" alt="Profile Picture" />
      </header>

      <div className="ticket-wallet">
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
      </div>

      {selectedTicket && (
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
      </div>

      <footer>
        <p>Contact support for assistance.</p>
      </footer>
    </div>
    </div>
    </>
  );
}

export default UserDashboard;
