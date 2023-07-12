import React,{useState} from 'react';
import './App.css';
import TrainBooking from './webpages/TrainBooking';
import Navbar from './components/Navbar';
import Homepage from './webpages/Homepage';
import {Route,Routes} from 'react-router-dom';
import PaymentNFT from './webpages/PaymentNFT';
import FlightBooking from './webpages/FlightBooking';
import BookYourTicket from './webpages/BookYourTicket';
import BookYourFlight from './webpages/BookYourFlight';


function App() {
  
  return (
    <>
    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path='/trainbook' element={<TrainBooking/>}/>
      <Route path='/railways' element={<BookYourTicket/>}/>
      <Route path='/flightbook' element={<FlightBooking/>}/>
      <Route path='/airways' element={<BookYourFlight/>}/>
      <Route path='/payment' element={<PaymentNFT/>}/>
    </Routes>
    
    </>
  );
}

export default App;
