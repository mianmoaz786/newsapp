import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './component/Navbar';
import News from './component/News';

import './App.css';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="app-background">
         
          <Navbar />
          <Switch>
            <Route exact path="/" render={() => <News pageSize={8} country="us" category="general" />} />
            <Route path="/category/:category" render={() => <News pageSize={8} country="us" />} />
            <Route path="/about" render={() => (
              <div className="container my-3">
                <h2>About Us</h2>
                <p>NewsTime brings you the latest and greatest in news from around the world. Stay informed with NewsTime.</p>
              </div>
            )} />
          </Switch>
        </div>
      </Router>
    );
  }
}
