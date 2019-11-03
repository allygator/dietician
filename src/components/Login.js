import React from "react";
import { useState } from "react";
import "../App.css";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

function Login() {
  const [signinInputs, setSignin] = useState({
    email: "",
    password: "",
  });

  const handleChangeIn = name => event => {
    setSignin({ ...signinInputs, [name]: event.target.value });
  };

  const handleClick = name => event => {};

  return (
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
        variant="outlined"
        required={true}
        onChange={handleChangeIn("password")}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" id="submitButton" onClick={handleClick()}>
        Login
      </Button>
    </div>
  );
}

export default Login;
