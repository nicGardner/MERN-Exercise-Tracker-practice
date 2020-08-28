import React from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';

function App() {
  axios.get('/api/exercises')
    .then(result => {
      console.log(result.data)
    })
    .catch(err => {
      console.log(err)
    })
  axios.get('/api/users')
    .then(result => {
      console.log(result.data)
    })
    .catch(err => {
      console.log(err)
    })
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload. zoop
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
