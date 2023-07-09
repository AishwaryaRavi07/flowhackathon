import React from 'react'
import { FaHome, FaStore, FaMoneyBillAlt, FaHeart, FaCogs } from 'react-icons/fa';
import { AiFillDashboard, AiOutlineWallet, AiOutlineLineChart } from 'react-icons/ai';
import { IoIosSearch } from 'react-icons/io';
import {PiAirplaneTiltDuotone} from 'react-icons/pi'

function PaymentNFT() {
    const nfts = [
        {
          id: 1,
          name: 'NFT 1',
          image: 'railnft.jpg',
          description: 'This is NFT 1',
          owner: 'John Doe',
        },
        {
          id: 2,
          name: 'NFT 2',
          image: 'railnft.jpg',
          description: 'This is NFT 2',
          owner: 'Jane Smith',
        },
        {
            id: 2,
            name: 'NFT 3',
            image: 'railnft.jpg',
            description: 'This is NFT 2',
            owner: 'Unmani Shinde',
          },
        // Add more NFT objects as needed
      ];
  return (
    <>
     <div className="container" style={{fontFamily:"Poppins"}}>
      <header className="header" style={{display:"flex",paddingLeft:"4vh"}}>
        <PiAirplaneTiltDuotone style={{fontSize:"32px",color:"black"}}/><h2 style={{color:"black"}}>TravToken</h2>
        <div className="search-bar">
          <IoIosSearch className="search-icon" style={{color:"black",fontSize:"25px",transform:"translate(140%,-20%)"}} />
          <input type="text" style={{textAlign:"center"}} placeholder="Search NFTs, Accounts and Collections" />
        </div>
      </header>
      <div style={{display:"flex"}}>
      <aside className="sidebar">
        <ul className="menu">
          <li><AiFillDashboard className="menu-icon" /> Dashboard</li>
          <li><FaStore className="menu-icon" /> NFTs Store</li>
          <li><FaMoneyBillAlt className="menu-icon" /> Active Bids</li>
          <li><FaHeart className="menu-icon" /> Favourites</li>
        </ul>
        <div className="account-details">
          <ul className="account-menu">
            <li><FaHome className="account-icon" /> Collections</li>
            <li><AiOutlineWallet className="account-icon" /> Wallet</li>
            <li><AiOutlineLineChart className="account-icon" /> Analytics</li>
            <li><FaCogs className="account-icon" /> Settings</li>
          </ul>
        </div>
      </aside>
      <div>
      <main className="main-content">
        <h1>Elevate Travel with NFT Tickets: Boundless Experiences Await!</h1>
      </main>
      <div>
      <h2 style={{textAlign:"center"}}>NFT Display</h2>
      <div className="nft-container">
        {nfts.map((nft) => (
          <div key={nft.id} className="nft-card">
            <img src={nft.image} alt={nft.name} />
            <h3>{nft.name}</h3>
            <p>{nft.description}</p>
            <p>Owner: {nft.owner}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
      </div>
      </div>
      
    

    </>
  )
}

export default PaymentNFT