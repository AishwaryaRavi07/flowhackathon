import React,{useState} from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ReCAPTCHA from 'react-google-recaptcha';
import { useNavigate } from 'react-router-dom';

function Signin() {
    const navigate=useNavigate();
    const [selectedDate, setSelectedDate] = useState(null);
    const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

    const handleCaptchaVerification = (response) => {
        if (response) {
          setIsCaptchaVerified(true);
        } else {
          setIsCaptchaVerified(false);
        }
      };

  

  const handleSubmit = (props) => {

    setSelectedDate('');
  };
  return (
    <>
    <div className='completesignup'>
        <div className='signupwrapper' >
            <div className='leftwalapart' style={{width:"90vh"}}>
                <h2 style={{textAlign:"center",fontSize:"30px"}}>TravToken: This is where Incredible Journey Starts </h2>
            <form style={{ marginTop: "6vh",marginLeft:"50px" }} onSubmit={handleSubmit}>
    <table>
      <tbody>
        <tr>
          <td>
            <label>Username:</label>
          </td>
          <td>
          <input
              type="text"
              placeholder='Enter your username'
              required
            />
          </td>
        </tr>
        
        <tr>
          <td>
            <label>Password</label>
          </td>
          <td>
          <input
              type="password"
              placeholder='Enter your passcode'
              required
            />
          </td>
        </tr>
      </tbody>
    </table>
    <div>
      {!isCaptchaVerified && (
        <div style={{marginLeft:"30px"}}>
          <h3>Please complete the CAPTCHA:</h3>
          <ReCAPTCHA
            sitekey="6LdYpx8nAAAAAFN9kYuYygTSmZAyPQpcdfoh2hH5"
            onChange={handleCaptchaVerification}
          />
        </div>
      )}
      {isCaptchaVerified && (
        <div>
          <h2>CAPTCHA verification successful!</h2>
          {/* Display other content or proceed with the process */}
        </div>
      )}
    </div>
    <div style={{display:"flex",gap:"5px",marginTop:'10px'}}>
    <p>Not part of the clan yet?</p>
    <a href='/signin'>SignUp</a><br/>
    </div>
    <button type="submit" style={{marginTop:"3vh",marginLeft:"15vh"}}onClick={()=>navigate('/railways')}>Start Journey</button>
  </form>
            </div>
            <div className='rightwalapart'>
                <p></p>
            </div>
        </div>
    </div>

    </>
  )
}

export default Signin