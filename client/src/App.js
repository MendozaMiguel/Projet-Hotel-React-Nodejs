import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Accueil from './components/home/Accueil';
import Chambres from './components/chambres/Chambres'
import Reservation from './components/reservation'


class App extends Component {
  render() {
    return (
      <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Accueil</Link>
          </li>
          <li>
            <Link to="/chambres">Chambres</Link>
          </li>
          <li>
            <Link to="/reservation">Reservation</Link>
          </li>
        </ul>

        <hr />

        <Route exact path="/" component={Accueil} />
        <Route path="/chambres" component={Chambres} />
        <Route path="/reservation" component={Reservation} />
      </div>
    </Router>
    );
  }
}

export default App;
