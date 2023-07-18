import React from 'react'
import { FaTrain , FaWallet} from 'react-icons/fa';
import {AiTwotoneBell} from 'react-icons/ai'

function Navbar() {
  return (
    <>
    <div className="MyHomepageNavbar ">
      <nav className="navbar">
        <ul >
          <li ><a style={{color:"black",fontWeight:"bold"}} href="/">Home</a></li>
          <li><a style={{color:"black",fontWeight:"bold"}} href="#pnr-status">Status</a></li>
          <li><a style={{color:"black",fontWeight:"bold"}} href="#trains"> Flights</a></li>
          <li><a style={{color:"black",fontWeight:"bold"}} href="#services-promotions">Services & Promotions</a></li>
          <li><a style={{color:"black",fontWeight:"bold"}} href="#irctc-rwallet">Wallet</a></li>
        </ul>
        <div className="right-items">
          <div className="dropdown">
            <button className="dropbtn">My Account</button>
            <div className="dropdown-content">
              {/* Display logged-in user details here */}
              <a href="#profile">Profile</a>
              <a href="#Logout">Logout</a>
              <a href="#logout">Logout</a>
            </div>
          </div>
          <a style={{color:"black",fontWeight:"bold"}} href="#contact-us">Contact Us</a>
          <a href="#notifications" className="alert">Alerts<AiTwotoneBell/></a>
        </div>
      </nav>
    </div>

    </>
  )
}

export default Navbar