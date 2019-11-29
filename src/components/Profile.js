import React from "react";
import { useState } from "react";
import "../App.css";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

function Profile() {
  const [profileInputs, setProfile] = useState({
    heightFeet: "",
    heightInches: "",
    weight: "",
    age: "",
    gender: "",
    selectedOption: "",
    schedule: "",
  });

  const handleChangeIn = name => event => {
    setProfile({ ...profileInputs, [name]: event.target.value });
  };

  const handleClick = name => event => {
    //var height = profileInputs.heightFeet * 12 + profileInputs.heightInches;
  };

  return (
    <div className="profileFields">
      Profile Information
      <br></br>
      <br></br>
      Height
      <TextField
        id="heightFeet"
        defaultValue={profileInputs.heightFeet}
        label="feet"
        variant="outlined"
        required={true}
        onChange={handleChangeIn("heightFeet")}
        fullWidth
        margin="normal"
      />
      <TextField
        id="heightInches"
        defaultValue={profileInputs.heightInches}
        label="inches"
        variant="outlined"
        required={true}
        onChange={handleChangeIn("heightInches")}
        fullWidth
        margin="normal"
      />
      <br></br>
      <br></br>
      Weight
      <TextField
        id="weight"
        defaultValue={profileInputs.weight}
        label="lbs"
        variant="outlined"
        required={true}
        onChange={handleChangeIn("weight")}
        fullWidth
        margin="normal"
      />
      <br></br>
      <br></br>
      Age
      <TextField
        id="age"
        defaultValue={profileInputs.age}
        label=""
        variant="outlined"
        required={true}
        onChange={handleChangeIn("age")}
        fullWidth
        margin="normal"
      />
      <br></br>
      <br></br>
      Gender
      <form>
        <div className="radio">
          <label>
            <input
              type="radio"
              value="male"
              checked={profileInputs.gender === "male"}
              onChange={handleChangeIn("gender")}
            />
            Male
          </label>
        </div>
        <div className="radio">
          <label>
            <input
              type="radio"
              value="female"
              checked={profileInputs.gender === "female"}
              onChange={handleChangeIn("gender")}
            />
            Female
          </label>
        </div>
        <div className="radio">
          <label>
            <input
              type="radio"
              value="other"
              checked={profileInputs.gender === "other"}
              onChange={handleChangeIn("gender")}
            />
            Prefer not to say
          </label>
        </div>
      </form>
      <br></br>
      <br></br>
      Schedule
      <TextField
        id="schedule"
        defaultValue={profileInputs.schedule}
        label=""
        variant="outlined"
        required={true}
        onChange={handleChangeIn("schedule")}
        fullWidth
        margin="normal"
      />
      <br></br>
      <br></br>
      <Button variant="contained" id="submitButton" onClick={handleClick()}>
        Submit Profile
      </Button>
    </div>
  );
}

export default Profile;
