import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar3';
import Footer from '../components/Footer'
import { FaCalendarAlt } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { MdLocationOn } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

function FlightBooking() {
  const navigate=useNavigate();
  const [flightSchedules, setFlightSchedules] = useState([]);
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');

  const AirAPI = async () => {
    const url = `https://skyscanner44.p.rapidapi.com/search-extended?adults=1&origin=${source}&destination=${destination}&departureDate=2023-07-12&startFrom=00%3A00&arriveTo=23%3A59&returnStartFrom=00%3A00&returnArriveTo=23%3A59`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'e7d7614529mshf3b0e6977befcc6p13700fjsn7c359e421cda',
        'X-RapidAPI-Host': 'skyscanner44.p.rapidapi.com',
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result.itineraries)
      if (result.itineraries && result.itineraries.results) {
        setFlightSchedules(result.itineraries.results);
      } else {
        setFlightSchedules([]);
      }
      
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
    <Navbar/>
      <div style={{ textAlign: "center",fontFamily:"Poppins" }}>
        <div className='airimage'></div>
        <h1 style={{marginTop:"10vh",marginBottom:"5vh"}}>Flight Schedules</h1>
        <div style={{ display: "flex", gap: "2rem", textAlign: "center", justifyContent: "center" }}>
          <div >
            <label><MdLocationOn style={{ fontSize: "40px", color: "#003580", marginBottom: "-10px" }} />From:</label>
            <input
              type="text"
              placeholder="Source"
              value={source}
              onChange={(e) => setSource(e.target.value)}
            />
          </div>
          <div>
            <label><MdLocationOn style={{ fontSize: "40px", color: "#003580", marginBottom: "-10px" }} />To:</label>
            <input
              type="text"
              placeholder="Destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
          <div>
            <FaCalendarAlt style={{ fontSize: "30px", color: "#003580", marginBottom: "-10px", marginRight: "5px" }} />Journey Date:
            <input
              type="date"
              
              placeholder="Date of Travel"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>
        <button style={{marginTop:"5vh"}} onClick={AirAPI}>Search</button>
       
          <div>
            <h2 style={{marginTop:"5vh"}}>Flight Schedules from {source} to {destination}</h2>
            <table>
              <thead>
                <tr>
                  <th>Flight Number</th>
                  <th>Origin</th>
                  <th>Destination</th>
                  <th>Departure Time (UTC)</th>
                  <th>Arrival Time (UTC)</th>
                  <th>Duration(in min)</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
              {flightSchedules
              
              .map((schedule) => (
    <tr key={schedule.id}>
      <td>{schedule.legs[0].segments[0].flightNumber}</td>
      <td>{schedule.legs[0].origin.name}</td>
      <td>{schedule.legs[0].destination.name}</td>
      <td>{schedule.legs[0].departure}</td>
      <td>{schedule.legs[0].arrival}</td>
      <td>{schedule.legs[0].durationInMinutes}</td>
      <td><button style={{backgroundColor:"#003580",color:"white",fontFamily:"poppins",borderRadius:"5px",cursor:"pointer",padding:"10px 20px"}} onClick={()=>navigate('/payment')}>Book Now</button></td>
    </tr>
  ))}
                
              </tbody>
            </table>
          </div>
        
      </div>
      <Footer/>
    </>
  );
}

export default FlightBooking;
