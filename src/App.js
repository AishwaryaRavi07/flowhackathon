import logo from './logo.svg';
import './App.css';
//import EmailComponent from './components/javascripts/receiveEmail';
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom';
import CreateProfile from './components/javascripts/createProfile';
import ViewTicketCollection from './components/javascripts/viewMyTickets';
import RequestTicket from './components/javascripts/requestTicket';
import Dashboard from './components/javascripts/dashboard';
import HomePage from './components/javascripts/homePage';

function App() {
  return (
    <Router>
    <Switch>
      <Route exact path='/' component={HomePage}></Route>
        <Route exact path="/dashboard/:flowAddr" component={Dashboard}></Route>
        <Route exact path="/create-profile" component={CreateProfile} />
        <Route exact path="/dashboard/:flowAddr" component={ViewTicketCollection} />
        <Route exact path="/request-ticket/:flowAddr" component={RequestTicket} /> 
    </Switch>
  </Router>
  );
}

export default App;
