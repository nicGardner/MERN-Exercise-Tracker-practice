import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar";
import ExerciseList from "./components/exercise-list";
import CreateExercise from "./components/create-exercise";
import CreateUser from "./components/create-user";

//define a react component called App
function App() {
  return (
    {/**when the following routes are engaged, passes the following react components to the react router*/},
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Route path="/" exact component={ExerciseList} />
        <Route path="/create" component={CreateExercise} />
        <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

//export App so it can be used by index.js
export default App;

