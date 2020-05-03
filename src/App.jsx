import React from 'react';
import { hot } from 'react-hot-loader/root';
import logo from 'assets/icons/logo.svg';
import Router from 'router';
import './assets/styles/App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Router />
    </div>
  );
}

export default hot(App);
