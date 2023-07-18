import React,{useState,useEffect} from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useHistory } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import Web3 from 'web3';
import NFTravelABI from "../solidity/ABI/NFTravelABI.json";

const contractAddress="0x779bC2333f7A82382183339a56D18c81007b1D21";
//import { useNavigate } from 'react-router-dom';

function Signin() {
    //const navigate=useNavigate();
    const [selectedDate, setSelectedDate] = useState(null);
    const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
    const [flowAddr,setFlowAddr] = useState('');
    const [email,setEmail] = useState('');
    const [accounts,setAccounts] = useState([]);
    const [contract,setContract] = useState(null);
    const [web3,setWeb3] = useState(null);
    const [isLoading,setIsLoading] = useState(true);

    const history = useHistory();


    const handleLogin = async (e) => {
      try {
        //await FCL.authenticate(); // Assuming this is an asynchronous function, use await here
        //FCL.currentUser.subscribe(setUser);
        e.preventDefault();

          const obj = await contract.methods.GetPersonDetails(flowAddr).call();
          const personDetails = Object.values(obj);
          console.log(personDetails[5],flowAddr);
          if (personDetails[5].includes(flowAddr)) {
            history.push(`/dashboard/${personDetails[5]}`);
          } else {
            alert("Invalid account address.");
          }
       
      } catch (error) {
        console.error("Error while authenticating:", error);
      }
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
            <form style={{ marginTop: "6vh",marginLeft:"50px" }}>
    <table>
      <tbody>
        <tr>
          <td>
            <label>Flow Address:</label>
          </td>
          <td>
          <input
              type="text"
              placeholder='Enter your Flow Wallet Address'
              required
              onChange={(e)=>{setFlowAddr(e.target.value)}}
            />
          </td>
        </tr>
        
        <tr>
          <td>
            <label>EMail</label>
          </td>
          <td>
          <input
              type="text"
              placeholder='Enter your associated EMail'
              required
              onChange={(e)=>{setEmail(e.target.value)}}
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
    <a href='/signup'>SignUp</a><br/>
    </div>
    <button type="submit" onClick={handleLogin} style={{marginTop:"3vh",marginLeft:"15vh"}}>Start Journey</button>
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