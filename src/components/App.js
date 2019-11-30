import React, { useEffect, useContext, useState } from "react";
import "../App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Calendar from "./Calendar";
import Profile from "./Profile";
import UserContext from "./Context/UserContext";
import { FirebaseContext } from "./Context/Firebase";
import CalendarChoices from "./CalendarChoices";

function App() {
  //Add additional routes here following the login route example
  const firebase = useContext(FirebaseContext);
  const [user, setUser] = useState({
    authUser: null,
  });
  useEffect(() => {
    firebase.auth.onAuthStateChanged(authUser => {
      if (authUser && authUser !== user.authUser) {
        // console.log(authUser);
        setUser({ ...user, authUser: authUser });
      }
      if (!authUser && user.authUser) {
        setUser({ ...user, authUser: null });
      }
    });
  }, [firebase.auth, user]);
  return (
    <Router>
      <UserContext.Provider value={user}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Profile} />
          <Route path="/calendar-choices" component={CalendarChoices} />
          <Route path="/calendar" component={Calendar} />
        </Switch>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
