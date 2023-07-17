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
  const [bookedSeats, setBookedSeats] = useState([]);

  const handleSelectSeat = (seatNumber) => {
    setSelectedSeat(seatNumber);
  };

  const handleSeatBook = () => {
    if (selectedSeat) {
      alert(`Seat ${selectedSeat} booked successfully!`);

      
    // Update the status of the selected seat
    const updatedSeats = seatMapData.map((seatMap) => {
      return {
        ...seatMap,
        decks: seatMap.decks.map((deck) => {
          return {
            ...deck,
            seats: deck.seats.map((seat) => {
              if (seat.number === selectedSeat) {
                return {
                  ...seat,
                  travelerPricing: [
                    {
                      ...seat.travelerPricing[0],
                      seatAvailabilityStatus: 'BOOKED',
                    },
                  ],
                };
              }
              return seat;
            }),
          };
        }),
      };
    });
    setSeatMapData(updatedSeats);
      setSelectedSeat(null);
    }
  };
    function fetchFlightData(){
      const accessToken='rMlfBvGNGTQUPAkwc4GoAqE9qVDf'
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
        const accessToken = 'rMlfBvGNGTQUPAkwc4GoAqE9qVDf';

      
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
       
    
      <div style={{ textAlign: "center", marginTop: "5vh",fontFamily:"Poppins" }}>
      <button style={{marginLeft:"180vh"}} onClick={()=>navigate('/payment')}>Proceed to Payment</button>
        <h1 style={{marginBottom:"7vh"}}>Our Flights</h1>
        
        
        <div >
          <div style={{marginLeft:"14vh",gap:"20rem"}}>
            <label>Departure: </label>
            <input style={{marginRight:"5vh"}}
              type="text"
              placeholder="Enter your Source"
              value={source}
              onChange={(e) => setSource(e.target.value)}
            />
            <label>Arrival: </label>
            <input style={{marginRight:"5vh"}}
              type="text"
              placeholder="Enter your Destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
            <label >Journey Date: </label>
            <input style={{marginRight:"5vh"}}
              type="date"
              placeholder="Date of Travel"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <button onClick={fetchFlightData}>Lock Flight Details</button>
          </div>

          <button style={{ marginTop: "5vh" }} onClick={fetchSeatMaps}>
            Show available seats
          </button>
        </div>
       
        <div style={{marginTop:"5vh"}}>
          <h2>Please select a seat from the available options for your journey.</h2>
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