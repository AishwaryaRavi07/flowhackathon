import React,{useState} from 'react'
import Navbar3 from '../components/Navbar3';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';

function BookYourFlight() {
    const navigate=useNavigate();
    const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSubmit = (props) => {

    setSelectedDate('');
  };
  return (
    <>
    <Navbar3/>
    <div className="App">
      <div className='mainrailwaybanner' style={{display:"flex",gap:"1rem"}}>
        <div className='railwayleft'>
        <div>
        <div>
  <h1 style={{ textAlign: "center",color:"#003580" }}>Welcome to the Airlines Ticketing Platform!</h1>
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
    <button type="submit" onClick={()=>navigate('/flightbook')}>Submit</button>
  </form>
</div>
</div>
        </div>
        <img src='./waitingroomfinal.png'></img>
      </div>
      </div>

    </>
  )
}

export default BookYourFlight