import React from "react";
import { useState,useEffect,useRef } from "react";
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { Web3Storage } from "web3.storage";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from "react-bootstrap";
import Web3 from 'web3';
import NFTravelABI from "../solidity/ABI/NFTravelABI.json";
import * as fcl from "@onflow/fcl";
import * as fcl2 from "@blocto/fcl";
import * as t from "@onflow/types";
import setNFTUser from "../cadence/transactions/setNFTUser";
import { FaStar } from 'react-icons/fa';
import { FaUser, FaRegWindowClose,FaListAlt, FaCar, FaHistory, FaEnvelope,FaRegCheckSquare} from 'react-icons/fa';
import {LuRotateCw,LuRotateCcw} from "react-icons/lu";
import { RiCaravanFill } from 'react-icons/ri';
import AvatarEditor from 'react-avatar-editor';

let discoveryWalletUrl =`https://fcl-discovery.onflow.org/testnet/authn/`;

fcl.config({
  "accessNode.api": "https://access-testnet.onflow.org",
  "discovery.wallet":discoveryWalletUrl
});


function CreateProfile() {

  //const clientEMail = props.email.toString();
  const dAPPID = "d9759cf3-6ef2-4b73-bd92-69cca6b7c47c";  
  const contractAddress = '0xd248E7c37Fa4C48253c154F81ed6a15B20F28949';

    const [user, setUser] = useState();
    const [ownerAddr, setOwnerAddr] = useState(null);
    const [setUpSuccessful, setSetUpSuccessful] = useState(false);
    const [isAuthenticated,setIsAuthenticated] = useState(false);
    const [name, setName] = useState('');
    const [email,setEmail] = useState('');
    const [dateOfJoining, setDateOfJoining] = useState('');
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

      useEffect(()=>{
        discoveryWalletUrl = `https://fcl-discovery.onflow.org/testnet/authn/${email}`;
      },[email]) 
  

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
    

  useEffect(() => {
    fcl.currentUser().subscribe(setUser);
    if (user && user.addr) {
      setOwnerAddr(user.addr);
  
    }    
  }, [user,ownerAddr]);

  const login = async () => {
    console.log(discoveryWalletUrl);
    await fcl.authenticate();
    if(user&&user.addr){console.log(user.addr);}
    setIsAuthenticated(true);
  };

  const createPersona = async (e) =>{
    e.preventDefault();
    if(user && user.addr){
      console.log(user.addr);
      let str = user.addr.toString();
      const currentDate = new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
      });
      //const emailString = clientEMail.toString();   
      const emailString = "unmani.shinde@gmail.com";   
      await contract.methods.createPerson(name,emailString,CID,currentDate,str).send({ from: accounts[0] });
      //console.log(currentDate);    
      history.push(`/dashboard/${str}`);
    }      
    
    
  }

  const setupUser = async () => {
    try {
      const acct = fcl.currentUser().authorization;
      const response = await fcl.send([fcl.transaction(setNFTUser), fcl.args([]), fcl.proposer(acct), fcl.payer(acct), fcl.authorizations([acct]), fcl.limit(9999)]).then(fcl.decode);
      if (response.errorMessage) {
        console.error("Error setting up collection:", response.errorMessage);
      } else {
        console.log("Collection set up successfully");
        setSetUpSuccessful(true);
      }
    } catch (error) {
      console.log("Error in transaction:", error);
      alert("Error in transaction.");
    }
  };


  return(<div>
    {!isAuthenticated&& (<div>
      <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          style={{ marginBottom: '10px', padding: '5px' }}
        />
        <button onClick={login}>Before we begin, please click here to verify your authority.</button>
    </div>)}

    {isAuthenticated && (<div>
      <button onClick={setupUser}>Setup User</button>
    </div>)

    }

    {setUpSuccessful &&(<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <h2 style={{ marginBottom: '20px' }}>User Details</h2>
    <form onSubmit={createPersona} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginBottom: '10px', padding: '5px' }}
      />

      <label htmlFor="dateOfJoining">Date of Joining:</label>
      <input
        type="date"
        id="dateOfJoining"
        value={dateOfJoining}
        onChange={(e) => setDateOfJoining(e.target.value)}
        style={{ marginBottom: '10px', padding: '5px' }}
      />

      <label>Upload Profile Picture</label>
      <input type="file" accept="image/*" onChange={handleImageChange} ref={fileInputRef} style={{marginLeft:"5.5vw",marginTop:"1vh",color: "transparent"}} capture="user" />

      <Modal style={{marginTop:"15vh"}} show={showPFPModal} onHide={() => setShowPFPModal(false)}>
  <Modal.Header closebutton>
    <Modal.Title><h4 style={{color:"black",fontWeight:"700",fontSize:'x-large'}}>Crop Profile Picture</h4></Modal.Title>
    <button onClick={() => setShowPFPModal(false)}>
      <FaRegWindowClose style={{transform:"scale(1.5)"}}/>
    </button>
  </Modal.Header>
  <Modal.Body>
    {image && (
      <div style={{alignSelf:'center',justifyContent:'center'}}>
        <AvatarEditor style={{alignSelf:'center',marginLeft:"7vw"}}
          ref={(ref) => setEditor(ref)}
          image={image}
          width={avatarSize}
          height={avatarSize}
          border={0}
          borderRadius={100}
          color={[255, 255, 255, 0.6]} // Color of the border, RGBA
          scale={scale}
          rotate={rotate}
        />
        <div>
        <label style={{ marginTop: '1rem',fontWeight:'700',fontSize:"large" }}>
  Select Zoom:
  <input
  type="range"
  min="0.1"
  max="2"
  step="0.1"
  value={scale}
  onChange={handleScaleChange}
  style={{
    background: 'linear-gradient(-45deg, #116D6E 10%, transparent 10%, transparent 20%, #116D6E 20%, #116D6E 30%, transparent 30%, transparent 40%, #116D6E 40%, #116D6E 50%, transparent 50%, transparent 60%, #116D6E 60%, #116D6E 70%, transparent 70%, transparent 80%, #116D6E 80%, #116D6E 90%, transparent 90%, transparent)',
    backgroundSize: '200% 200%',
    //animation: 'progress-bar-stripes 2s linear infinite',
    borderRadius: '5px',
    height: '8px',
    width:"20vw",
    marginLeft: '0.5rem',
    outline: 'none',
    WebkitAppearance: 'none',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
    '::-webkit-slider-thumb': {
      backgroundColor: 'purple',
      width: '16px',
      height: '16px',
      borderRadius: '50%',
      cursor: 'pointer',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
    },
    
  }}
/>


</label>
<br></br>
<div style={{alignSelf:'center',paddingLeft:"6vw",paddingTop:'1vh'}}>
<button style={{alignSelf:'center',justifyContent:'center',backgroundColor:"#116D6E",color:"#FEFEFA",padding:'1vh',marginRight:"1vw",borderRadius:"5px",fontWeight:'700',fontSize:"large"}} onClick={() => handleRotate('left')}><LuRotateCcw style={{fontWeight:'700'}}/> Rotate Left</button>
          <button style={{alignSelf:'center',justifyContent:'center',backgroundColor:"#116D6E",color:"#FEFEFA",padding:'1vh',borderRadius:"5px",fontWeight:'700',fontSize:"large"}} onClick={() => handleRotate('right')}><LuRotateCw style={{fontWeight:"700"}}/> Rotate Right</button>
</div>

          
        </div>
      </div>
    )}
  </Modal.Body>
  <Modal.Footer>
    
    <button style={{fontWeight:"700",fontSize:'large',color:'white',backgroundColor:'#14C38E',padding:'1vh',borderRadius:'5px'}}onClick={handleCrop}>
      Save Changes    <FaRegCheckSquare style={{transform:'scale(1.5)',marginLeft:'0.5vw'}}/>
    </button>
  </Modal.Footer>
</Modal>


      <button type="submit" style={{ padding: '10px 20px', backgroundColor: 'blue', color: 'white', border: 'none' }}>
        Submit
      </button>
    </form>

    {!(imageSrc=="") && (
      <div style={{display:'flex',flexDirection:'column'}}>
        <p>Profile Picture: </p>
        <div style={{ position: 'relative', width: '30vh', height: '30vh', borderRadius: '50%', overflow: 'hidden' }}>
            
            <AvatarEditor
      image={imageSrc}
      width={avatarSize}
      height={avatarSize}
      border={0}
      borderRadius={100}
      color={[255, 255, 255, 0]}
      scale={1}
      rotate={rotate}
    />
            </div>
        
        
        </div>
            
          
          )}



  </div>) }




  </div>
    

  )

    
}

export default CreateProfile;