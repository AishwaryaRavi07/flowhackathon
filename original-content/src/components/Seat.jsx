import React, { useState } from 'react';

const Seat = ({ seatNumber, isSelected, isBooked, onSelect }) => {
  const handleClick = () => {
    if (!isBooked) {
      onSelect(seatNumber);
    }
  };

  return (
    <button
      className={`seat ${isSelected ? 'selected' : ''} ${isBooked ? 'booked' : ''}`}
      onClick={handleClick}
      disabled={isBooked}
    >
      {seatNumber}
    </button>
  );
};

export default Seat;
