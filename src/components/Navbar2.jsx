import React from 'react'
import { FaTrain , FaWallet} from 'react-icons/fa';
import {AiTwotoneBell} from 'react-icons/ai'
import "../App.css"
import {SiYourtraveldottv} from "react-icons/si"
import {FaFlagUsa} from "react-icons/fa"
import { useNavigate } from 'react-router-dom';

function Navbar2() {
  const navigate=useNavigate()
  return (
    <>
    <div className="MyHomepageNavbar">
      <nav className="hpnavbar" style={{display:"flex"}}>
        
        <ul>
        <SiYourtraveldottv style={{fontSize:"50px",color:"white"}}/>
          <li><a href="#home">Destination</a></li>
          <li><a href="#pnr-status">About Us</a></li>
          <li><a href="/railways"> Trip Plan</a></li>
          <li><a href="#services-promotions">Blog</a></li>
          <li><a href="#irctc-rwallet">FAQs</a></li>
        
        </ul>
        <div className='navbar-right' >
        </div>
        <div style={{marginLeft:"30vh"}}>
            <button className='button' style={{borderRadius:"10px",width:"15vh"}} onClick={()=>navigate('/signin')}>US <FaFlagUsa/> </button>
            <button className='button' onClick={()=>navigate('/signup')}>Get Started</button>
          </div>
        
        
      </nav>
    </div>

    </>
  )
}

export default Navbar2