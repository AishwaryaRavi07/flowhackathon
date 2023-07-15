import React, { useState } from 'react';
import Seat from '../components/Seat';
import { FaRestroom,FaCoffee } from 'react-icons/fa';
import {GiCoffeeCup} from 'react-icons/gi'


const SeatLayout = () => {
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [bookedSeats, setBookedSeats] = useState([]);

  const handleSeatSelect = (seatNumber) => {
    setSelectedSeat(seatNumber);
  };

  const handleSeatBook = () => {
    if (selectedSeat) {
      setBookedSeats([...bookedSeats, selectedSeat]);
      setSelectedSeat(null);
    }
  };

  const renderSeats = () => {
    const seats = [];

    for (let i = 1; i <= 60; i++) {
      const isBooked = bookedSeats.includes(i);

      seats.push(
        <Seat
          key={i}
          seatNumber={i}
          isSelected={selectedSeat === i}
          isBooked={isBooked}
          onSelect={handleSeatSelect}
        />
      );
    }

    return seats;
  };

  return (
    
    <div className="seat-layout">
    <h2>Select your seat:</h2>
    <div className="aircraft-container">
    <div style={{display:"flex",marginLeft:"5vh",gap:"39vh",marginTop:"1vh"}}>
      <div className="washroom-icon left"><FaRestroom size={32}/></div>
      <div className="washroom-icon right"><GiCoffeeCup size={32}/></div>
      </div>
      <div style={{display:"flex",textAlign:"center",marginLeft:"9vh",gap:"42px",marginTop:"0.5vh"}}>
        <h3>A</h3>
        <h3>B</h3>
        <h3>C</h3>
        <h3>D</h3>
        <h3>E</h3>
        <h3>F</h3>
      </div>
      
      <div className="seat-container">{renderSeats()}</div>
      <div style={{display:"flex",marginLeft:"5vh",gap:"39vh",marginTop:"1vh"}}>
      <div className="washroom-icon left"><FaRestroom size={32}/></div>
      <div className="washroom-icon right"><FaRestroom size={32}/></div>
      </div>
    </div>
    <div className="seat-legend">
        <div className="seat-legend-item">
          <div className="seat-color available" />
          <span>Available</span>
        </div>
        <div className="seat-legend-item">
          <div className="seat-color booked" />
          <span>Booked</span>
        </div>
        <div className="seat-legend-item">
          <div className="seat-color selected" />
          <span>Selected</span>
        </div>
      </div>
    <div className="seat-selection-summary">
        Selected Seat: {selectedSeat ? `Seat ${selectedSeat}` : 'None'}
      </div>

    <button className="book-button" onClick={handleSeatBook}>
      Book Seat
    </button>
  </div>
  );
};

export default SeatLayout;
