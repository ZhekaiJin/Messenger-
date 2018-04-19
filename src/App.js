import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Button} from "antd-mobile"
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Messenger</h1>
        </header>
        <Button onClick={()=>console.log("Hello")}>Hello</Button>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
