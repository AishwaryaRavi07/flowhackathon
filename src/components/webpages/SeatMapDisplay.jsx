import React,{useState,useEffect} from 'react';
//import { useNavigate } from 'react-router-dom';
import {IoAirplaneSharp} from 'react-icons/io5'
import {BsDashLg} from 'react-icons/bs'
import { FaRestroom,FaCoffee } from 'react-icons/fa';
import {GiCoffeeCup} from 'react-icons/gi'
import Web3 from 'web3';
import * as fcl from "@onflow/fcl";
import * as FCL from "@blocto/fcl";
import * as t from "@onflow/types";
import mintNFTicket from "../cadence/transactions/mintNFTicket";
import NFTravelABI from "../solidity/ABI/NFTravelABI.json";
const contractAddress = "0x779bC2333f7A82382183339a56D18c81007b1D21";
 
 
function SeatDisplay ({ seatStatus, seatNumber, selectedSeat, onSelectSeat }) {

 
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
 
function SeatMapDisplay(props) {
  const [flightData, setFlightData] = useState([]);
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
 // const navigate=useNavigate();
  const [seatMapData, setSeatMapData] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState('');
  const [seats, setSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [isLoading,setIsLoading] = useState(true);
  const [accounts,setAccounts] = useState([]);
  const [contract,setContract] = useState(null);
  const [web3,setWeb3] = useState(null);
 
  const handleSelectSeat = (seatNumber) => {
    setSelectedSeat(seatNumber);
  };

  useEffect(() => {
    const initialize = async () => {
      // Check if web3 is injected by the browser (Mist/MetaMask)
      if (typeof window.ethereum !== 'undefined') {
        try {
          // Request account access
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const web3 = new Web3(window.ethereum);
          setWeb3(web3);

          // Get the user's accounts
          const accounts = await web3.eth.getAccounts();
          setAccounts(accounts);

          // Get the contract instance
          const contract = new web3.eth.Contract(NFTravelABI, contractAddress);
          setContract(contract);  
              setIsLoading(false);

        } catch (error) {
          console.error('Error initializing Web3:', error);
          alert('An error occurred while initializing Web3. Please make sure you have MetaMask installed and try again.');
        }
      } else {
        console.log('Please install MetaMask!');
      }
    };

    initialize();
  }, []);
  const handleSeatBook = async() => {
    if (selectedSeat) {
      const dateobj = new Date(date);
          const formattedDate = dateobj.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric"
          });
      
      try {
        const transactionID = await fcl.send([
          fcl.transaction(mintNFTicket),
          fcl.args([
            fcl.arg(source, t.String),
            fcl.arg(destination, t.String),
            fcl.arg(props.address, t.Address),
            fcl.arg(formattedDate, t.String),
            fcl.arg(selectedSeat.toString(), t.String),
            fcl.arg("", t.String),
          ]),
          fcl.payer(fcl.authz),
          fcl.proposer(fcl.authz),
          fcl.authorizations([fcl.authz]),
          fcl.limit(9999),
        ])
          .then(fcl.decode)
          .catch((error) => {
            console.log("Error in transaction:", error);
            alert("Error in transaction.");
          });
          console.log(fcl.tx(transactionID).onceSealed());
  
        //console.log("Ticket Minted with Transaction ID:", transactionID);
        const st = props.address.toString();
        // Reset form fields
        await contract.methods.CreateTicket(source,destination,formattedDate,selectedSeat.toString(),props.address).send({from: accounts[0]});

      } catch (error) {
        console.log("Error in transaction:", error);
        alert("Error in transaction.");
      }


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
      const accessToken='HBGsUvrJWOM1Bpx808iljFbAbcys'
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
        const accessToken = 'HBGsUvrJWOM1Bpx808iljFbAbcys';
 
 
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
      {/* <button style={{marginLeft:"180vh"}}>Proceed to Payment</button> */}
 
 
        <div >
          <div style={{marginLeft:"20vh",gap:"20rem"}}>
            <label>Departure: </label>
            <input style={{marginRight:"1vh"}}
              type="text"
              placeholder="Enter your Source"
              value={source}
              onChange={(e) => setSource(e.target.value)}
            />
            <label>Arrival: </label>
            <input style={{marginRight:"1vh"}}
              type="text"
              placeholder="Enter your Destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
            <label >Journey Date: </label>
            <input style={{marginRight:"1vh"}}
              type="date"
              placeholder="Date of Travel"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <button onClick={fetchFlightData}>Lock Flight Details</button>
          </div>
 
          <button style={{ marginTop: "2vh",marginLeft:"21vh" }} onClick={fetchSeatMaps}>
            Show available seats
          </button>
        </div>
 
        <div style={{marginTop:"5vh",textAlign:'center'}}>
          <h2 style={{textAlign:'center',marginLeft:"22vh"}}>Please select a seat from the available options for your journey.</h2>
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
    <div style={{ display: 'flex', flexDirection: 'row' }} key={index}>
      <div style={{ marginLeft: '-21vh', overflowY: 'scroll', height: '30vh' }}>
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
    </div>
  )
))}

        </div>
      </div>
 
  </>
  )
}
 
export default SeatMapDisplay