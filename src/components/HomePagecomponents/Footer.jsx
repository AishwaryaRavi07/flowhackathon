import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { RiNftFill } from 'react-icons/ri';


const Footer = () => {
  return (
    <footer className="homefooter">
        
        <div className="footer-content">
        <div>
          <h2 style={{letterSpacing:"0.2rem"}}>Subscribe to our newsletter</h2>
          <h3  style={{letterSpacing:"0.1rem"}}>Stay up to date with our latest news and promotions.</h3>
          <div style={{marginTop:"10vh"}}>
            <input type='text' placeholder='Enter your email ID' />
            <button type='submit' style={{ marginLeft: "1vh" }}>Subscribe</button>
          </div>
          </div>
        
      <div className="footer-icons">
        <FaFacebook className="icon" />
        <FaTwitter className="icon" />
        <FaInstagram className="icon" />
        <FaLinkedin className="icon" />
        <RiNftFill className="icon" />
        <FaEnvelope className="icon" />
      </div>
      <div className="footer-links">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
      <p className="footer-text">© 2023 TravToken. All rights reserved.</p>
      <p>Designed and developed by TravToken Team</p>
      </div>
    </footer>
  );
};

export default Footer;
