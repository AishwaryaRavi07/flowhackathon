import React from 'react'

function Destination() {
  return (
    <>
    <div style={{fontFamily:"Poppins"}}>
    <h2 style={{textAlign:"center",fontSize:"7vh",marginTop:"20vh"}}>Expedition Travel For The Adventurous</h2>
    <p style={{textAlign:"center",width:"100vh",marginLeft:"55vh",marginTop:"5vh",fontSize:"3vh"}}>Embark on a journey to these breathtaking destinations and let your wanderlust come alive. Experience the thrill of exploring vibrant cultures, indulging in exotic cuisines, and immersing yourself in the rich history that each destination has to offer. </p>
    <div className='destimage'>
    <div className="card">
      <div className="card-image">
        <img src="./maldives.jpg"  />
      </div>
      <div className="card-content" >
        <h3>Wonderful Maldives</h3>
        <p>Booking a holiday to the Maldives is like stepping into a paradise of unparalleled beauty and tranquility. With its pristine white sandy beaches, crystal-clear turquoise waters, and vibrant marine life, the Maldives offers a dreamlike escape for travelers seeking a luxurious and relaxing getaway.</p>
      </div>
    </div>
    <div className="card" style={{marginTop:"18vh",marginLeft:"20px"}}>
    <div className="card-content">
        <h3>Santorini Beach</h3>
        <p>Book your dream holiday to Santorini Beach, where whitewashed villas cling to cliffs overlooking the azure Aegean Sea. Experience breathtaking sunsets, indulge in local delicacies, and immerse yourself in Greek island charm.</p>
      </div>
      <div className="card-image" style={{marginTop:"-5vh"}}>
        <img src="./beach.jpg"  />
      </div>
      
    </div>
    <div className="card" style={{marginLeft:"30px"}}>
      <div className="card-image">
        <img style={{marginLeft:"12px"}}src="./japan.jpg"  />
      </div>
      <div className="card-content">
        <h3>Adventure in Japan</h3>
        <p>Embark on an enchanting journey to Japan, where ancient traditions blend seamlessly with modern wonders. Immerse yourself in vibrant cityscapes, explore serene temples, savor exquisite cuisine, and discover the captivating beauty of cherry blossoms.</p>
      </div>
    </div>
    <div className="card"  style={{marginTop:"16vh",marginLeft:"40px"}}>
    <div className="card-content">
        <h3>Signature New Zealand</h3>
        <p>Unleash your sense of adventure in New Zealand's breathtaking landscapes. From majestic mountains to pristine lakes and stunning fjords, experience thrilling outdoor activities, Maori culture, and warm Kiwi hospitality on your unforgettable holiday.</p>
      </div>
      <div className="card-image">
        <img style={{marginLeft:"12px",marginTop:"-7vh"}} src="./newzealand.jpg"  />
      </div>
      
    </div>
    </div>
    </div>
    
    
    </>
  )
}

export default Destination