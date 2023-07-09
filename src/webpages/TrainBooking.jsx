import React,{useState} from 'react'
import Navbar from '../components/Navbar';
import {MdLocationOn} from 'react-icons/md';
import {FaCalendarAlt} from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function TrainBooking() {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [selectedClass, setSelectedClass] = useState('2A');
  const [selectedTravelerType, setSelectedTravelerType] = useState('General');
  const [selectedFareType, setSelectedFareType] = useState('Regular');
  const [trainSchedule, setTrainSchedule] = useState([]);

  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSubmit = (props) => {

    setSelectedDate('');
  };

  const API= async()=>{

    const url = 'https://trains.p.rapidapi.com/';
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'e7d7614529mshf3b0e6977befcc6p13700fjsn7c359e421cda',
        'X-RapidAPI-Host': 'trains.p.rapidapi.com'
      },
      body: JSON.stringify({ search: `${source} to ${destination}` })
    };
    
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setTrainSchedule(result);
      
    } catch (error) {
      console.error(error);
    }


  }


  const classOptions = ['1A', '2A', '3A', 'SL', 'CC', '2S'];
  const travelerTypes = ['General', 'Ladies', 'Older Citizens'];
  const fairTypes = ['Regular', 'Armed Forces', 'Student','Senior Citizens'];
  return (
    <>
    <Navbar/>
    <div className="App">
      <div className='mainrailwaybanner' style={{display:"flex",gap:"1rem"}}>
        <div className='railwayleft'>
        <div>
        <div>
  <h1 style={{ textAlign: "center",color:"#003580" }}>Welcome to the Railway Ticketing Platform!</h1>
  <form style={{ marginTop: "6vh" }} onSubmit={handleSubmit}>
    <table>
      <tbody>
        <tr>
          <td>
            <label>Trip Type:</label>
          </td>
          <td>
            <select required>
              <option value="">Select trip type</option>
              <option value="oneWay">One-way</option>
              <option value="roundTrip">Round trip</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>
            <label>Number of Members:</label>
          </td>
          <td>
            <input
              type="number"
              min="1"
              required
            />
          </td>
        </tr>
        <tr>
          <td>
            <label>Select Date of Journey:</label>
          </td>
          <td>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              minDate={new Date()}
              placeholderText="Select a date"
              className="date-picker"
            />
          </td>
        </tr>
        <tr>
          <td>
            <label>Facilities:</label>
          </td>
          <td>
            <div>
              <label>
                <input
                  type="checkbox"
                  value="food"
                />
                Food
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  value="wifi"
                />
                Wi-Fi
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  value="entertainment"
                />
                Entertainment
              </label>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <button type="submit">Submit</button>
  </form>
</div>
</div>
        </div>
        <img src='./junction.png'></img>
      </div>
      <main className="content">
        <section className="services">
          <h2>Our Services</h2>
          <ul>
            <li>Book Train Tickets</li>
            <li>PNR Status Enquiry</li>
            <li>Train Schedule</li>
            <li>Seat Availability</li>
          </ul>
        </section>
        <section className="book-trains">
          <h2>Modify Search and Filter</h2>
          <div className="input-group">
            <div >
              <div className='selection' style={{display:"flex",gap:"2rem",fontFamily:"Poppins"}}>
            <div>
            <label><MdLocationOn style={{fontSize:"40px",color:"#003580",marginBottom:"-10px"}}/>From:</label>
            <input
              type="text"
              placeholder="Source"
              value={source}
              onChange={(e) => setSource(e.target.value)}
            />
            </div>
            <div>
            <label><MdLocationOn style={{fontSize:"40px",color:"#003580",marginBottom:"-10px"}}/>To:</label>
            <input
              type="text"
              placeholder="Destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
            </div>
            <div>
            <FaCalendarAlt style={{fontSize:"30px",color:"#003580",marginBottom:"-10px",marginRight:"5px"}}/>Journey Date:
            <input
              type="date"
              placeholder="Date of Travel"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            </div>
            </div>
            </div>
            <div className='specialselection'>
             <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            {classOptions.map((option) => (
              <option key={option} value={option}>
                Class: {option}
              </option>
            ))}
          </select>
          <select
            value={selectedTravelerType}
            onChange={(e) => setSelectedTravelerType(e.target.value)}
          >
            {travelerTypes.map((type) => (
              <option key={type} value={type}>
                Traveler Type: {type}
              </option>
            ))}
          </select>
                    <select
            value={selectedFareType}
            onChange={(e) => setSelectedFareType(e.target.value)}
          >
            {fairTypes.map((type) => (
              <option key={type} value={type}>
                Fare Type: {type}
              </option>
            ))}
            
          </select>
          </div>
            <button style={{marginTop:"5vh"}}onClick={API}>Search</button>
          </div>
        </section>

        <section className="train-table" style={{marginTop:"5vh",fontFamily:"poppins"}}>
        <h2 style={{fontSize:"30px"}}>Train Schedule</h2>
        <table>
          <thead>
            <tr>
              <th>Train Number</th>
              <th>Train Name</th>
              <th>From</th>
              <th>To</th>
              <th>Departure Time</th>
              <th>Arrival Time</th>
              <th>Classes</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {trainSchedule.map(train => (
              <tr key={train.train_num}>
                <td>{train.train_num}</td>
                <td>{train.name}</td>
                <td>{train.train_from}</td>
                <td>{train.train_to}</td>
                <td>{train.data.departTime}</td>
                <td>{train.data.arriveTime}</td>
                <td>{train.data.classes.join(", ")}</td>
                <td><button style={{backgroundColor:"#003580",color:"white",fontFamily:"poppins",borderRadius:"5px",cursor:"pointer",padding:"10px 20px"}}>Book Now</button></td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="featured">
  <h2>Featured Offers</h2>
  <div className="offer-card">
    <img
      src="https://www.metrorailnews.in/wp-content/uploads/2021/09/Railways-696x469.png"
      alt="Offer"
      className="offer-image"
    />
    <div className="offer-details">
      <h3>Special Summer Discount</h3>
      <p>Get up to 20% off on AC Class tickets.</p>
    </div>
  </div>

  <div className="offer-card">
    <img
      src="./tickets-on-sale.png"
      alt="Offer"
      className="offer-image"
    />
    <div className="offer-details">
      <h3>Weekend Getaway Sale</h3>
      <p>Enjoy discounted fares for weekend travel.</p>
    </div>
  </div>

  <div className="offer-card">
    <img
    
      src="./family.jpg"
      alt="Offer"
      className="offer-image"
    />
    <div className="offer-details">
      <h3>Family Discount</h3>
      <p>Save on tickets when traveling with your family.</p>
    </div>
  </div>
</section>
      </main>
      {/* <BookTicks/> */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} IRCTC Railways</p>
      </footer>
    </div>
    
    
    
    
    
    </>
  )
}

export default TrainBooking