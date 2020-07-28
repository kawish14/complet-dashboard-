import React, { Component } from 'react';
//import { Router, Route, Switch } from 'react-router-dom'
import {Header, Sidebar, Dashboard} from './component'


class App extends Component {
  render() {
    return (
      <div id="main-wrapper">
          <Header />
          <Sidebar />
          <Dashboard />
      </div>
       
    );
  }
}

export default App;
