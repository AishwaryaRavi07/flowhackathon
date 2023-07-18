import React from "react";

function HomePage (){ 

    return (
        <div>
            <button style={{marginRight:'1vw',marginTop:'2vh'}}><a href="/create-profile">Create Profile</a></button>
            <button style={{marginRight:'1vw',marginTop:'2vh'}}><a href="/user-login">Login</a></button>
        </div>
    )
}

export default HomePage;