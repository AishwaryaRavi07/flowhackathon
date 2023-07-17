import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {IoAirplaneSharp} from 'react-icons/io5'
import {BsDashLg} from 'react-icons/bs'
import { FaRestroom,FaCoffee } from 'react-icons/fa';
import {GiCoffeeCup} from 'react-icons/gi'


function SeatDisplay({ seatStatus, seatNumber, selectedSeat, onSelectSeat }) {
  // Apply appropriate styling based on seat status
  const getSeatClass = (status) => {
    switch (status) {
      case 'AVAILABLE':
        return 'seat-available';
      case 'OCCUPIED':
        return 'seat-occupied';
      case 'SELECTED':
        return 'seat-selected';
      
        case 'BLOCKED':
        case 'BOOKED':
          return 'seat-booked';

      default:
        return 'seat';
    }
  };

  const handleClick = () => {
    if (seatStatus === 'AVAILABLE') {
      onSelectSeat(seatNumber);
    }
  };

    return (
      <div
      className={`seat ${getSeatClass(seatStatus)} ${
        selectedSeat === seatNumber ? 'seat-selected' : ''
      }`}
      onClick={handleClick}
    >
      {seatNumber}
    </div>
    )
  
}

function SeatMapDisplay() {
  const [flightData, setFlightData] = useState([]);
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const navigate=useNavigate();
  const [seatMapData, setSeatMapData] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState('');
  const [seats, setSeats] = useState([]);

  const handleSelectSeat = (seatNumber) => {
    setSelectedSeat(seatNumber);
  };

  const handleSeatBook = () => {
    if (selectedSeat) {
      alert(`Seat ${selectedSeat} booked successfully!`);

       // Update the status of the selected seat
    const updatedSeats = seats.map((seat) =>
    seat.number === selectedSeat ? { ...seat, status: 'booked' } : seat
  );
  console.log(updatedSeats)
      setSeats(updatedSeats);
      setSelectedSeat(null);
    }
  };
    function fetchFlightData(){
      const accessToken='X1S7nyMBXiayS1AEIcnrpp6wnIPS'
      const departureDate = '2023-11-01';
      const returnDate = '2023-12-01';
      const adults = 1;
      const max = 5;
    
      const url = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${source}&destinationLocationCode=${destination}&departureDate=${date}&adults=${adults}&max=${max}`;
    
      fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(data => {
          console.log(data); 
          setFlightData(data.data); 
          const delay = 2000; 

          setTimeout(() => {
            console.log(flightData); 
            
          }, delay);
          
          

        })
        .catch(error => {
          console.error(error);
        });

    }

    function fetchSeatMaps() {
        const accessToken = 'X1S7nyMBXiayS1AEIcnrpp6wnIPS';

      
        fetch('https://test.api.amadeus.com/v1/shopping/seatmaps', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify( {data:flightData} ),
        })
          .then(response => response.json())
          .then(data => {
            console.log(data.data); 
            setSeats(data.data)
            setSeatMapData(data.data);
            console.log(data.data[0].decks[0].seats[0].travelerPricing[0].seatAvailabilityStatus)
          })
          .catch(error => {
            console.error(error);
          });
      }

      

  return (
    <>
    
    
      <div style={{ textAlign: "center", marginTop: "10vh",fontFamily:"Poppins" }}>
        <h2>Taking Flight Offer Data</h2>
        <div >
          <div style={{marginLeft:"1vh",gap:"2rem"}}>
            <input
              type="text"
              placeholder="Enter your Source"
              value={source}
              onChange={(e) => setSource(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter your Destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
            <input
              type="date"
              placeholder="Date of Travel"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <button onClick={fetchFlightData}>Lock Flights</button>
          </div>

          <button style={{ marginTop: "5vh" }} onClick={fetchSeatMaps}>
            Show available seats
          </button>
        </div>
       
        <div>
          <h2>Seat Map</h2>
          <button className="book-button" onClick={handleSeatBook}>
      Book Seat
    </button>
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
          {seatMapData.map((seatMap, index) => (
            seatMap.aircraft.code === '320' && (
            <div key={index}>
              <h3>Aircraft: {seatMap.aircraft.code}</h3>
              {seatMap.decks.map((deck, deckIndex) => (
                <div key={deckIndex}>
                  <h4>Deck Type: {deck.deckType}</h4>
                  <div className="seat-map">
                    {deck.seats.map((seat, seatIndex) => (
                      <SeatDisplay
                        key={seatIndex}
                        seatStatus={seat.travelerPricing[0].seatAvailabilityStatus}
                        seatNumber={seat.number}
                        selectedSeat={selectedSeat}
                        onSelectSeat={handleSelectSeat}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            )
          ))}
        </div>
      </div>
    
  </>
  )
}

export default SeatMapDisplay