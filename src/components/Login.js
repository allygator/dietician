import React from "react";
import { useState, useContext } from "react";
import "../App.css";
import { FirebaseContext } from "./Context/Firebase";
import UserContext from "./Context/UserContext";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";

// import { Redirect, Link, useHistory } from "react-router-dom";
import { Redirect, Link } from "react-router-dom";

function Login() {
  const firebase = useContext(FirebaseContext);
  const userData = useContext(UserContext);
  // let history = useHistory();
  const [newUser, createUser] = useState(false);
  const toggle = () => createUser(!newUser);
  const [signinInputs, setSignin] = useState({
    email: "",
    password: "",
  });
  const [errMsg, updateMsg] = useState("");
  const [addErr, updateAdd] = useState(false);
  const [passErr, updatePass] = useState(false);

  const handleChangeIn = name => event => {
    setSignin({ ...signinInputs, [name]: event.target.value });
  };

  function signin(email, pass) {
    firebase.doSignInWithEmailAndPassword(email, pass).catch(error => {
      if (error.code === "auth/invalid-email") {
        updateAdd(true);
        if (passErr) {
          updatePass(false);
        }
        updateMsg(error.message);
      } else if (
        error.code === "auth/wrong-password" ||
        error.code === "auth/weak-password"
      ) {
        updatePass(true);
        if (addErr) {
          updateAdd(false);
        }
        updateMsg(error.message);
      } else if (error.code === "auth/user-not-found") {
        updateAdd(false);
        updatePass(false);
        updateMsg("Make sure you check the box if you are a new user.");
      }
    });
  }

  function signup(email, pass) {
    firebase
      .doCreateUserWithEmailAndPassword(email, pass)
      .then(authUser => {
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
        if (error.code === "auth/weak-password") {
          updatePass(true);
          if (addErr) {
            updateAdd(false);
          }
          updateMsg(error.message);
        } else if (error.code === "auth/user-not-found") {
          updateAdd(false);
          updatePass(false);
          updateMsg("Make sure you check the box if you are a new user.");
        }
      });
  }

  function login(email, pass) {
    updateMsg("");
    if (newUser) {
      signup(email, pass);
    } else {
      signin(email, pass);
    }
    // if (!addErr && !passErr && errMsg.length < 1) {
    //   console.log("test");
    // }
  }

  const fields = (
    <div className="login_fields">
      <TextField
        id="email"
        defaultValue={signinInputs.email}
        label="Email"
        variant="outlined"
        required={true}
        error={addErr}
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
        error={passErr}
        onChange={handleChangeIn("password")}
        fullWidth
        margin="normal"
      />
      <div id="error">{errMsg}</div>
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
  );

  return (
    <div className="login">
      <header>
        <h1>Diet Life</h1>
        <Link to="/">
          <Button variant="outlined" color="primary">
            Home
          </Button>
        </Link>
      </header>
      <div className="signin">
        {userData.authUser && newUser ? (
          <Redirect
            to={{
              pathname: "/dashboard",
            }}
          />
        ) : (
          fields
        )}
        {userData.authUser ? (
          <Redirect
            to={{
              pathname: "/dashboard",
            }}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Login;
