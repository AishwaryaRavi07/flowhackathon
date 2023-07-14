import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import {useState, useEffect} from 'react';
import {getNFTsScript} from "../scripts/getUserNFTickets";


function Collection(props) {
  const [nfts, setNFTs] = useState([]);

  useEffect(() => {
    getUserNFTs();
  }, [])

  const getUserNFTs = async () => {
    console.log(props.address);
      const result = await fcl.send([
          fcl.script(getNFTsScript),
          fcl.args([
              fcl.arg(props.address, t.Address)
          ])
      ]).then(fcl.decode);

      console.log(result);
      setNFTs(result);
  }
 
  return (
    <div style={{backgroundColor: 'lightgreen'}}>
      {nfts.map(nft => (
          <div key={nft.id}>
              <h1>{nft.id}</h1>
              
          </div>
      ))}
    </div>
  );
}

export default Collection;