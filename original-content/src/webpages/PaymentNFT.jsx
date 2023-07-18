import React from 'react';
import {useState, useEffect} from 'react';
import { FaHome, FaStore, FaMoneyBillAlt, FaHeart, FaCogs } from 'react-icons/fa';
import { AiFillDashboard, AiOutlineWallet, AiOutlineLineChart } from 'react-icons/ai';
import { IoIosSearch } from 'react-icons/io';
import {PiAirplaneTiltDuotone} from 'react-icons/pi';

// main  0x35da933bc4547fa5
// 0x4a54b498b65d4487

import * as fcl from "@onflow/fcl";
import * as types from "@onflow/types";

import { create } from "ipfs-http-client";
// import { mintNFTTx, viewNFTScript } from "./cadence/code.js";

// const client = create('https://ipfs.infura.io:5001/api/v0');

// fcl.config()
//   .put("accessNode.api", "https://access-testnet.onflow.org")
//   .put("discovery.wallet", "https://fcl-discovery.onflow.org/testnet/authn")

function PaymentNFT() {
  const [user, setUser] = useState();
  const [file, setFile] = useState();
  const [scriptResult, setScriptResult] = useState([]);
  const [nameOfNFT,setNameOfNFT]=useState('')

  // useEffect(()=>{
  //   fcl.currentUser().subscribe(setUser)
  // })

  // const logIn= () =>{
  //   fcl.authenticate()
    
  // }

  // const logOut= () =>{
  //   fcl.unauthenticate()
  // }

  const mint = ()=>{
     console.log(nameOfNFT)
  }

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
            id: 3,
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
        <PiAirplaneTiltDuotone style={{fontSize:"32px",color:"black",marginTop:"-3vh"}}/><h2 style={{color:"black"}}>TravToken</h2>
        <div className="search-bar" style={{marginRight:"75vh"}}>
        
        
          <IoIosSearch className="search-icon" style={{color:"black",fontSize:"25px",transform:"translate(150%,-20%)"}} />
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
          <ul className="menu">
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