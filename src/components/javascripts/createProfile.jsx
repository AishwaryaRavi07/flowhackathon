import React, { Suspense } from "react";
import { useState,useEffect,useRef } from "react";
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { Web3Storage } from "web3.storage";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from "react-bootstrap";
import Web3 from 'web3';
import NFTravelABI from "../solidity/ABI/NFTravelABI.json";
import * as fcl from "@onflow/fcl";
import * as FCL from "@blocto/fcl";
import * as t from "@onflow/types";
import setNFTUser from "../cadence/transactions/setNFTUser";
import { FaStar } from 'react-icons/fa';
import "../stylesheets/createProfile.css";
import { FaUser, FaRegWindowClose,FaListAlt, FaCar, FaHistory, FaEnvelope,FaRegCheckSquare} from 'react-icons/fa';
import {LuRotateCw,LuRotateCcw} from "react-icons/lu";
import { RiCaravanFill } from 'react-icons/ri';
import AvatarEditor from 'react-avatar-editor';

let discoveryWalletUrl =`https://fcl-discovery.onflow.org/testnet/authn/`;
const contractAddress = "0x779bC2333f7A82382183339a56D18c81007b1D21";

// FCL.config({
//   "accessNode.api": "https://access-testnet.onflow.org",
//   "discovery.wallet":discoveryWalletUrl
// });

function CreateProfile() {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [isAuthenticated,setIsAuthenticated] = useState(false);
    const [user,setUser]= useState(null);
    const [loggedOut,setLoggedOut] = useState(false);
    const dAPPID = '703c6e22-ccf4-4cd7-b9aa-42764708ab7c'; 

    const [web3, setWeb3] = useState(null);
    const [accounts, setAccounts] = useState([]);
    const [contract, setContract] = useState(null);

    const [showPFPModal,setShowPFPModal]=useState(false);
    const [image, setImage] = useState(null);
    const [editor, setEditor] = useState(null);
    const [scale, setScale] = useState(1);
    const [rotate, setRotate] = useState(0);
    const windowHeight = window.innerHeight;
    const avatarSize = windowHeight * 0.3; // 30% of the viewport height
    const [imageSrc, setImageSrc] = useState('');
    const [CID,setCID] = useState('');
    const handleImageChange = (event) => {
      const file = event.target.files[0];
      setImage(URL.createObjectURL(file));
      setShowPFPModal(true);
    };

    const history = useHistory();
  
    const handleCrop = async () => {
      if (editor) {
        const canvas = editor.getImageScaledToCanvas().toDataURL();
        //console.log(canvas);
        // Do something with the cropped image canvas
        setShowPFPModal(false);
        await storeFiles(canvas);
      }
    };
    const fileInputRef = useRef(null);
   
    const getFiles = () => {
      if (fileInputRef.current && fileInputRef.current.files) {
        return fileInputRef.current.files;
      }
      return null;
    }
  
    function getAccessToken() {
      return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDQ5NTg0QzFjYjQ1QzczMTQwODQ3RjY2NjBkQ0Y5MzNjODNBM2NFMjAiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODc4OTc1NDg1NzIsIm5hbWUiOiJjb21tdXRlLWlvLXBmcC1zdG9yYWdlIn0.ocUIDWupDo_fnouuAGN2rPvsA2uhd-BG_eHvWal55Ps";
    }
    
    function makeStorageClient() {
      return new Web3Storage({ token: getAccessToken() });
    }
  
    const dataURLToBlob = async (dataURL) => {
      const response = await fetch(dataURL);
      const blob = await response.blob();
    
      // Extract file type from data URL
      const fileType = dataURL.split(',')[0].split(':')[1].split(';')[0].split('/')[1];
      // Generate a unique file name using a timestamp
      const fileName = `image.${fileType}`;
      return new File([blob], fileName, { type: blob.type });
    };
    
   
    const storeFiles = async (canvas) => {
      const blob = await dataURLToBlob(canvas);
      const files = [blob];
      
      const client = makeStorageClient();
  
      if (files==null) {
        console.error('No files selected.');
        return;
      }
  
      try {
          const cid = await client.put(files);
          alert("File upload successful.");
          console.log('stored files with cid:',cid);
          setCID(cid);
          
    
          
        
      } catch (error) {
        alert("There was an upload problem.")
        console.log(error);
      }
    };
  
    const retrieve = async () => {
      const client = makeStorageClient();
  
      try {
        if(!(CID=="")){
          const res = await client.get(CID);
  
          if (!res.ok) {
            throw new Error(`Failed to get ${CID}`);
          }
          const baseWeb3StorageUrl = 'https://ipfs.io/ipfs/';
          const file = '/image.png';
          const fileName = `${baseWeb3StorageUrl}${CID}${file}`;
          setImageSrc(fileName);
      
        } 
       
      } catch (error) {
        console.error('Error retrieving image:', error);
      }
    };
  
    useEffect(() => {
      if (fileInputRef.current && fileInputRef.current.files.length > 0) {
        const file = fileInputRef.current.files[0];
        setImage(URL.createObjectURL(file));
      }
      retrieve();
    }, []);
  
    const handleScaleChange = (event) => {
      const scaleValue = parseFloat(event.target.value);
      setScale(scaleValue);
    };
  
    const handleRotate = (direction) => {
      setRotate((prevRotate) => (direction === 'left' ? prevRotate - 90 : prevRotate + 90));
    };
       // Added loading state
    
       useEffect(() => {
        const retrieveImage = async () => {
          await retrieve();
        };    
          retrieveImage();
    
      }, []);

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
    

    useEffect(()=>{
        discoveryWalletUrl = `https://wallet-v2-dev.blocto.app/${dAPPID}/flow/authn/${email}`;
        FCL.config({
            "accessNode.api": "https://access-testnet.onflow.org",
            "discovery.wallet":discoveryWalletUrl
          });
      },[email]) 

      useEffect(() => {
        const subscription = FCL.currentUser().subscribe((user) => {
            setUser(user);
          });
      }, [user]);

     // ... Existing code ...

const handleMetamaskLogin = async(e)=>{
    e.preventDefault();
    try {
        let str = user.addr.toString();
        const currentDate = new Date().toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric"
        });
        await contract.methods.createPerson(name, email.toString(), CID, currentDate, str).send({ from: accounts[0] });
        alert("Transaction successful.")
    } catch (error) {
        console.log("There was an error with the Metamask Transaction: ",error);
        
    }
}

const handleLogin = async (e) => {
    e.preventDefault();
  
    // Authenticate with FCL and wait for the authentication to complete
    try {
      await FCL.authenticate();
    } catch (error) {
      console.error("Error while authenticating:", error);
      alert("Failed to authenticate with Flow.");
      return;
    }
  
    // Now, after authentication is successful, continue with createPerson 
    setIsAuthenticated(true);
  };
  
  // ... Rest of the code ...
  
    
      // Logout function
      const handleLogout = async () => {
        await FCL.unauthenticate(); // Assuming this is an asynchronous function, use await here
        setIsAuthenticated(false);
        setLoggedOut(true);
        setIsAuthenticated(false);
      };

      useEffect(() => {
        const handleBeforeUnload = (event) => {
          if (!loggedOut) {
            event.preventDefault();
            event.returnValue = ""; // Required for Chrome
            
          }
        };
    
        window.addEventListener("beforeunload", handleBeforeUnload);
    
        return () => {
          window.removeEventListener("beforeunload", handleBeforeUnload);
        };
      }, [loggedOut]);
    
      return (
        <div style={{ alignSelf: 'center' }}>
          {!isAuthenticated && (
            <div style={{ width: '45vw' }}>
              <label>Enter Name:</label>
              <input type="text" required placeholder="Name" onChange={(e) => setName(e.target.value)} />
              <label>Enter EMail:</label>
              <input type="text" required placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
              <button onClick={handleLogin}>Login</button> {/* Use handleLogin function */}
            </div>
          )}
          {isAuthenticated && (
            <div>
              <h1>Address Logged In: {user.addr ? user.addr : ''}</h1>
              <button onClick={handleMetamaskLogin}>Metamask Set Up</button>
              <button onClick={handleLogout}>Logout</button> 
            </div>
          )}
        </div>
      );
    

    
}

export default CreateProfile;