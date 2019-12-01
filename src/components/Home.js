import React from "react";
import react from "../logos/logo.svg";
import netlify from "../logos/logomark.svg";
import { useContext } from "react";
import "../App.css";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import UserContext from "./Context/UserContext";

function App() {
  const userData = useContext(UserContext);
  const login = (
    <Link to="/login">
      <Button variant="contained" color="primary">
        Login
      </Button>
    </Link>
  );
  const dashboard = (
    <Link to="/dashboard">
      <Button variant="contained" color="primary">
        Dashboard
      </Button>
    </Link>
  );

  const loginOrDashboard = userData.authUser ? dashboard : login;

  return (
    <div className="App home">
      <header className="App-header">
        <div id="stripes" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        {loginOrDashboard}
        <div id="intro">
          <h1>Diet Life</h1>
          <h2>An Online Dietician</h2>
          <p>Helping you achieve your fitness and lifestyle goals.</p>
        </div>
      </header>
      <section>
        <div>
          <h1>Developers</h1>
          <h2>
            Built by Alyssa Davis, Jose Perez, Toan Vu, Weining Li, and Charles Stephens
          </h2>
        </div>
      </section>
      <section>
        <div>
          <h1>Technologies</h1>
          <div>
            <h2>Built using React</h2>{" "}
            <div id="react">
              <img src={react} className="App-logo" alt="react logo" />
            </div>
          </div>
          <div>
            <h2>Designed using Material-UI</h2>{" "}
            <img
              src="https://material-ui.com/static/images/material-ui-logo.svg"
              className="logo"
              alt="material logo"
            />
          </div>
          <div>
            <h2>Hosted on Netlify</h2>{" "}
            <img src={netlify} className="logo" alt="material logo" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;

//
// <a
//   className="App-link"
//   href="https://reactjs.org"
//   target="_blank"
//   rel="noopener noreferrer"
// >
//   Learn React
// </a>
