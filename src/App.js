import React,{useState} from 'react';
import './App.css';
import TrainBooking from './webpages/TrainBooking';
import Navbar from './components/Navbar';
import Homepage from './webpages/Homepage';
import {Route,Routes} from 'react-router-dom';
import PaymentNFT from './webpages/PaymentNFT';
import FlightBooking from './webpages/FlightBooking';


function App() {
  
  return (
    <>
    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path='/trainbook' element={<TrainBooking/>}/>
      <Route path='/flightbook' element={<FlightBooking/>}/>
      <Route path='/payment' element={<PaymentNFT/>}/>
    </Routes>
    
    </>
  );
}

export default App;
