import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {IoAirplaneSharp} from 'react-icons/io5'
import {BsDashLg} from 'react-icons/bs'

function SeatMapDisplay() {
  const [flightData, setFlightData] = useState([]);
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const navigate=useNavigate();
  const [seatMapData, setSeatMapData] = useState([]);

    function fetchFlightData(){
      const accessToken='ZSCRnnidlGHW5AGbBypzxXIC5XCh'
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
        const accessToken = 'ZSCRnnidlGHW5AGbBypzxXIC5XCh';

      
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
            setSeatMapData(data.data);
          })
          .catch(error => {
            console.error(error);
          });
      }

      

  return (
    <>
    
      <div style={{ textAlign: "center", marginTop: "10vh" }}>
        <h2>Taking Flight Offer Data</h2>
        <div>
          <div>
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
          {seatMapData.map((seatMap, index) => (
            <div key={index}>
              <h3>Aircraft: {seatMap.aircraft.code}</h3>
              {seatMap.decks.map((deck, deckIndex) => (
                <div key={deckIndex}>
                  <h4>Deck Type: {deck.deckType}</h4>
                  <table>
                    <thead>
                      <tr>
                        <th>Seat Number</th>
                        <th>Cabin</th>
                        <th>Characteristics Codes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {deck.seats.map((seat, seatIndex) => (
                        <tr key={seatIndex}>
                          <td>{seat.number}</td>
                          <td>{seat.cabin}</td>
                          <td>{seat.characteristicsCodes.join(", ")}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    
  </>
  )
}

export default SeatMapDisplay