import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div style={{alignSelf:"center"}}>
      <button style={{ backgroundColor: "lightgreen", color: "black", padding: "10px 20px", border: "none" }}>
        <Link to={`/create-profile`} className="profile" style={{ textDecoration: "none", color: "white" }}>Create Profile</Link>
      </button>
    </div>
  );
}

export default HomePage;
