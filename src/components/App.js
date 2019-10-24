import React from "react";
import "../App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Calendar from "./Calendar/Calendar";

function App() {
    //Add additional routes here following the login route example
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/calendar" component={Calendar} />
      </Switch>
    </Router>
  );
}

export default App;
