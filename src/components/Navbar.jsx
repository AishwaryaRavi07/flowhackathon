import React from 'react'
import { FaTrain , FaWallet} from 'react-icons/fa';
import {AiTwotoneBell} from 'react-icons/ai'

function Navbar() {
  return (
    <>
    <div className="MyHomepageNavbar ">
      <nav className="navbar">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="#pnr-status">PNR Status</a></li>
          <li><a href="#trains"> Trains</a></li>
          <li><a href="#services-promotions">Services & Promotions</a></li>
          <li><a href="#irctc-rwallet">IRCTC RWallet</a></li>
        </ul>
        <div className="right-items">
          <div className="dropdown">
            <button className="dropbtn">My Account</button>
            <div className="dropdown-content">
              {/* Display logged-in user details here */}
              <a href="#profile">Profile</a>
              <a href="#settings">Settings</a>
              <a href="#logout">Logout</a>
            </div>
          </div>
          <a href="#contact-us">Contact Us</a>
          <a href="#notifications" className="alert">Alerts<AiTwotoneBell/></a>
        </div>
      </nav>
    </div>

    </>
  )
}

export default Navbar