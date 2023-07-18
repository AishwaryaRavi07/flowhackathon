import React from 'react'
import Bitcoin from "../HomePagecomponents/img/bitcoin.jpg"

function Services() {
  return (
    <>
    <div className='Services'>
        <h2 style={{textAlign:"center"}}>OUR COMMITMENT TO EXCELLENCE</h2>
        <div className='contentdiv' style={{display:"flex",marginTop:"-5vh"}}>
            <div className='leftseccontent'>
                <div className='feature'>
            <h3>NFT-Enhanced Travel Experiences</h3>
      
            <p>Experience unique and immersive travel adventures with our NFT-powered platform. Discover exclusive virtual tours, augmented reality experiences, and collectible digital assets tied to remarkable destinations.</p>
            </div>

            <div className='feature'>

            <h3>Personalized Travel Planning</h3>
            
            <p>Let our experts assist you in crafting your dream itinerary. Receive personalized recommendations for accommodations, activities, and attractions that match your preferences and interests, ensuring a truly unforgettable journey.</p>
            </div>
            <div className='feature'>
            <h3>NFT Marketplace and Collectibles</h3>
            
            <p>Explore our NFT marketplace, where you can buy, sell, and trade travel-themed digital collectibles. Acquire unique NFTs representing iconic landmarks, memorable travel moments, and unlock exclusive perks and rewards.</p>
            </div>
            </div>

            
            <div className='rightseccontent'>
                <img src={Bitcoin}></img>
            </div>
        </div>
        </div>
    
    
    
    
    </>
  )
}

export default Services