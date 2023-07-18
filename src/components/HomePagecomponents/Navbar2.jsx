import React from 'react'
import { FaTrain , FaWallet} from 'react-icons/fa';
import {AiTwotoneBell} from 'react-icons/ai'
import "../HomePagecomponents/baseStyle.css";
import {SiYourtraveldottv} from "react-icons/si"
import {FaFlagUsa} from "react-icons/fa"
import { useNavigate } from 'react-router-dom';

function Navbar2() {
  //const navigate=useNavigate()
  return (
    < div>
    <div className="MyHomepageNavbar" >
      <nav className="hpnavbar" style={{display:"flex"}}>
        
        <ul>
        <SiYourtraveldottv style={{fontSize:"50px",color:"white"}}/>
          <li><a href="#home">Destination</a></li>
          <li><a href="#pnr-status">About Us</a></li>
          <li><a href="/railways"> Trip Plan</a></li>
          <li><a href="#services-promotions">Blog</a></li>
          <li><a href="#irctc-rwallet">FAQs</a></li>
        
        </ul>
        
        <div style={{marginLeft:"20vh"}}>
        <button className='button' style={{ marginRight: '-1vw' }}>
  <a
    href='/signin'
    style={{
      color: 'white',
      textDecoration: 'none',
      transition: 'color 0.3s', // Smooth transition for color change on hover
    }}
    onMouseEnter={(e) => (e.target.style.color = 'black')} // Change color to black on hover
    onMouseLeave={(e) => (e.target.style.color = 'white')} // Change color back to white when not hovered
  >US <FaFlagUsa/></a> </button>
            <button className='button' style={{ marginRight: '-1vw' }}>
  <a
    href='/signup'
    style={{
      color: 'white',
      textDecoration: 'none',
      transition: 'color 0.3s', // Smooth transition for color change on hover
    }}
    onMouseEnter={(e) => (e.target.style.color = 'black')} // Change color to black on hover
    onMouseLeave={(e) => (e.target.style.color = 'white')} // Change color back to white when not hovered
  >
    Get Started
  </a>
</button>

          </div>
        
        
      </nav>
    </div>

    </div>
  )
}

export default Navbar2