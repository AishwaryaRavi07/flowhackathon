import logo from './logo.svg';
import './App.css';
import HomePage from './components/javascripts/HomePage';
import CreateProfile from './components/javascripts/createProfile';
import Login from './components/javascripts/LoginPage';
import Dashboard from './components/javascripts/dashboard';
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom';
import Homepage from "./components/webpages/Homepage";
import Signin from "./components/webpages/Signin";
import Signup from "./components/webpages/Signup";
import UserDashboard from "./components/webpages/Dashboard";
import BookanNFTicket from './components/webpages/BookAnNFTicket';
import Collections from './components/webpages/Collections';
import NFTicketsStore from './components/webpages/NFTicketsStore';



function App() {
  return (
    <div className="App">
      <Router>
    <Switch>
    
      <Route exact path='/' component={Homepage}></Route>
      <Route exact path="/signup" component={Signup}/>
      <Route exact path="/signin" component={Signin}/> 
      <Route exact path='/dashboard/:flowAddr' component={UserDashboard}></Route>
      <Route exact path='/dashboard/NFTicketsStore/:flowAddr' component={NFTicketsStore}></Route>


      
      <Route exact path='/dashboard/BookanNFTicket/:flowAddr' component={BookanNFTicket}></Route>
      <Route exact path='/dashboard/Collections/:flowAddr' component={Collections}></Route>
        {/* <Route exact path="/dashboard/:flowAddr" component={Dashboard}></Route>
        <Route exact path="/create-profile" component={CreateProfile} />
        <Route exact path='/user-login' component={Login}/> */}
        {/* <Route exact path="/my-tickets/:flowAddr" component={ViewTicketCollection} />
        <Route exact path="/request-ticket/:flowAddr" component={RequestTicket} /> 
        <Route exact path="/all-tickets-on-sale/:flowAddr" component={ViewTicketMarketplace} /> */}
    </Switch>
  </Router>
    </div>
  );
}

// function App2() {
  
//   return (
//     <Router>
//     <Switch>
//       <Route path="/" element={<Homepage/>}/>
//      
//       <Route path='/trainbook' element={<TrainBooking/>}/>
//       <Route path='/railways' element={<BookYourTicket/>}/>
//       <Route path='/flightbook' element={<FlightBooking/>}/>
//       <Route path='/airways' element={<BookYourFlight/>}/>
//       <Route path='/bookseats' element={<SeatMapDisplay/>}/>
//       <Route path='/payment' element={<PaymentNFT/>}/>
//       <Route path='/dashboard' element={<UserDashboard/>}/>
//     </Switch>
    
//     </Router>
//   );
// }


export default App;
