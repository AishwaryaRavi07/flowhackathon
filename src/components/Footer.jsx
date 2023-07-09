import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { RiNftFill } from 'react-icons/ri';


const Footer = () => {
  return (
    <footer className="homefooter">
        
        <div className="footer-content">
        
      <div className="footer-icons">
        <FaFacebook className="icon" />
        <FaTwitter className="icon" />
        <FaInstagram className="icon" />
        <FaLinkedin className="icon" />
        <RiNftFill className="icon" />
        <FaEnvelope className="icon" />
      </div>
      <p className="footer-text">© 2023 TravToken. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
