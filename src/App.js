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
import Signup from './webpages/Signup';
import Signin from './webpages/Signin';
import SeatLayout from './webpages/SeatLayout'
import UserDashboard from './webpages/Dashboard';


function App() {
  
  return (
    <>
    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/signin" element={<Signin/>}/>
      <Route path='/trainbook' element={<TrainBooking/>}/>
      <Route path='/railways' element={<BookYourTicket/>}/>
      <Route path='/flightbook' element={<FlightBooking/>}/>
      <Route path='/airways' element={<BookYourFlight/>}/>
      <Route path='/bookseats' element={<SeatLayout/>}/>
      <Route path='/payment' element={<PaymentNFT/>}/>
      <Route path='/dashboard' element={<UserDashboard/>}/>
    </Routes>
    
    </>
  );
}

export default App;
