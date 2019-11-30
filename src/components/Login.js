import React from "react";
import { useState, useContext } from "react";
import "../App.css";
import { FirebaseContext } from "./Context/Firebase";
import UserContext from "./Context/UserContext";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { Redirect } from "react-router-dom";

function Login() {
  const firebase = useContext(FirebaseContext);
  const userData = useContext(UserContext);
  const [newUser, createUser] = useState(false);
  const toggle = () => createUser(!newUser);
  const [signinInputs, setSignin] = useState({
    email: "",
    password: "",
  });

  const handleChangeIn = name => event => {
    setSignin({ ...signinInputs, [name]: event.target.value });
  };

  function signin(email, pass) {
    firebase.doSignInWithEmailAndPassword(email, pass).catch(error => {
      console.log(error);
    });
  }

  function signup(email, pass) {
    firebase
      .doCreateUserWithEmailAndPassword(email, pass)
      .then(authUser => {
        console.log(userData);
        console.log(authUser);
        if (authUser.additionalUserInfo.isNewUser) {
          if (firebase) {
            firebase.db
              .collection("users")
              .doc(authUser.user.uid)
              .set({ bank: 0, admin: false });
          }
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  function login(email, pass) {
    if (newUser) {
      signup(email, pass);
    } else {
      signin(email, pass);
    }
  }

  const fields = (
    <div>
      <div className="login_fields">
        Dietician Login
        <TextField
          id="email"
          defaultValue={signinInputs.email}
          label="Email"
          variant="outlined"
          required={true}
          onChange={handleChangeIn("email")}
          fullWidth
          margin="normal"
        />
        <TextField
          id="password"
          defaultValue={signinInputs.password}
          label="Password"
          type="password"
          variant="outlined"
          required={true}
          onChange={handleChangeIn("password")}
          fullWidth
          margin="normal"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={newUser}
              onChange={toggle}
              value="newUser"
              inputProps={{
                "aria-label": "primary checkbox",
              }}
            />
          }
          label="Check if you are a new user"
        />
        <Button
          variant="contained"
          id="submitButton"
          onClick={() => login(signinInputs.email, signinInputs.password)}
        >
          Login
        </Button>
      </div>
    </div>
  );

  return (
    <div className="login">
      <div className="signin">
        {userData.authUser ? (
          <Redirect
            to={{
              pathname: "/calendar",
            }}
          />
        ) : (
          fields
        )}
      </div>
    </div>
  );
}

export default Login;
