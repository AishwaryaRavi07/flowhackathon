import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function Dashboard() {

    const {flowAddr} = useParams();



    return (
        <div>
             <button><Link to={`/dashboard/${flowAddr}`} className="profile">View Tickets</Link></button>
             <button><Link to={`/request-ticket/${flowAddr}`} className="profile">Request Tickets</Link></button>
             <button><Link to={`/my-tickets-on-sale`} className="profile">My Tickets on Sale</Link></button>
        </div>
       
    )
    
}

export default Dashboard;