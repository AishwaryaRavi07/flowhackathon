import React from 'react'
import Navbar2 from '../HomePagecomponents/Navbar2'
import Banner from '../HomePagecomponents/Banner'
import Services from '../HomePagecomponents/Services'
import Footer from '../HomePagecomponents/Footer'
import Destination from '../HomePagecomponents/Destination'
import "../HomePagecomponents/baseStyle.css";

function Homepage() {
  const homepageContainerStyle = {
    width: "98vw",
    marginLeft: "-1vw",
    marginTop: "-2vh",
    overflowX: "hidden",
    alignSelf:'center',
    
  
  };
  const wrapperStyle = {
    overflow: "hidden",
    
  };

  return (
    <div style={wrapperStyle}>
      <div style={homepageContainerStyle}>
      <Navbar2 />
      <Banner />
      <Services />
      <Destination />
      <Footer />
    </div>


    </div>
    
  );
}

export default Homepage