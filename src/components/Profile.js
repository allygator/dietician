import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
// import { useHistory } from "react-router-dom";

import CalendarChoices from "./CalendarChoices";
import CalendarForm from "./CalendarForm/CalendarForm";
import UserContext from "./Context/UserContext";
import { FirebaseContext } from "./Context/Firebase";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: "2rem",
    marginBottom: "5rem",
    fontSize: "1rem",
  },
  inputGroup: {
    display: "flex",
  },
  input: {
    margin: "0.5rem 0.4rem",
  },
  formControl: {
    flex: 1,
    margin: "0.5rem 0.4rem",
  },
  calendar: {
    fontSize: "0.9rem",
  },
  btn: {
    marginTop: "3rem",
  },
}));

function Profile(props) {
  const firebase = useContext(FirebaseContext);
  const userData = useContext(UserContext);
  // let history = useHistory();

  const [error, setError] = useState("");
  const [profileInputs, setProfile] = useState({
    firstName: "",
    lastName: "",
    height: "",
    heightft: "",
    heightin: "",
    weight: "",
    age: "",
    gender: "",
    training: "",
    schedule: [[], [], [], [], [], [], []],
  });
  const [submitted, setSubmitted] = useState(false);
  const [response, setResponse] = useState({});

  const classes = useStyles();

  useEffect(() => {
    setError("");
  }, [profileInputs]);

  const handleChangeIn = name => event => {
    if (name === "heightft") {
      setProfile({
        ...profileInputs,
        heightft: event.target.value,
        height: event.target.value * 12,
      });
    } else if (name === "heightin") {
      setProfile({
        ...profileInputs,
        heightin: event.target.value,
        height: profileInputs.height + event.target.value,
      });
    } else {
      setProfile({ ...profileInputs, [name]: event.target.value });
    }
  };

  const handleScheduleIn = value => {
    setProfile({ ...profileInputs, schedule: value });
  };

  const handleFirstForm = () => {
    const { firstName, lastName, height, weight, age, gender } = profileInputs;

    if (!firstName || !lastName || !height || !weight || !age || !gender) {
      setError("Please enter all required fields");
      return;
    }

    const busySchedule = {};
    profileInputs.schedule.forEach((daily, index) => {
      const day = {};
      daily.forEach((task, i) => {
        day[i * 2] = task.start;
        day[i * 2 + 1] = task.end;
      });
      busySchedule[index] = day;
    });

    const formatedSchedule = profileInputs.schedule.map(daily => {
      const day = [];
      daily.forEach((task, i) => {
        day.push(task.start);
        day.push(task.end);
      });
      return day;
    });

    fetch("/.netlify/functions/schedule", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify(formatedSchedule),
    })
      .then(result => result.json())
      .then(res => {
        setSubmitted(true);
        setResponse(res.retVal);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleSecondForm = schedule => {
    const { firstName, lastName, height, weight, age, gender, training } = profileInputs;

    firebase.db
      .collection("users")
      .doc(userData.authUser.uid)
      .set({
        firstName,
        lastName,
        weight: parseInt(weight),
        height: parseInt(height),
        age: parseInt(age),
        gender,
        training,
        fullSchedule: Object.assign({}, schedule),
      })
      .then(() => {
        // Success: do something here
        console.log("success");
        props.directTo("Calendar");
      })
      .catch(err => {
        console.log("err", err);
      });
  };

  if (submitted) {
    return (
      <Container maxWidth="lg">
        <CalendarChoices response={response} onSubmit={handleSecondForm} />
      </Container>
    );
  }

  return (
    <Container className={classes.root} id="profile">
      <h3> Personal Information</h3>
      <div className={classes.inputGroup}>
        <TextField
          value={profileInputs.firstName}
          label="First Name"
          variant="outlined"
          required
          multiline
          onChange={handleChangeIn("firstName")}
          margin="normal"
        />
        <TextField
          label="Last Name"
          value={profileInputs.lastName}
          onChange={handleChangeIn("lastName")}
          variant="outlined"
          required
          margin="normal"
        />
      </div>
      <div className={classes.inputGroup}>
        <TextField
          id="heightft"
          label="Height (feet)"
          value={profileInputs.heightft}
          onChange={handleChangeIn("heightft")}
          type="number"
          variant="outlined"
          required
          margin="normal"
        />
        <TextField
          id="heightin"
          label="Height (inches)"
          value={profileInputs.heightin}
          onChange={handleChangeIn("heightin")}
          type="number"
          variant="outlined"
          required
          margin="normal"
        />
        <TextField
          id="weight"
          label="Weight (lbs)"
          value={profileInputs.weight}
          onChange={handleChangeIn("weight")}
          type="number"
          variant="outlined"
          required
          margin="normal"
        />
        <TextField
          id="age"
          label="Age"
          value={profileInputs.age}
          onChange={handleChangeIn("age")}
          type="number"
          variant="outlined"
          required
          margin="normal"
        />
      </div>
      <div className={classes.inputGroup}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
            aria-label="gender"
            name="gender1"
            value={profileInputs.gender}
            onChange={handleChangeIn("gender")}
          >
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>

        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Training</FormLabel>
          <RadioGroup
            aria-label="training"
            name="training"
            value={profileInputs.training}
            onChange={handleChangeIn("training")}
          >
            <FormControlLabel value="strength" control={<Radio />} label="Strength" />
            <FormControlLabel value="cardio" control={<Radio />} label="Cardio" />
          </RadioGroup>
        </FormControl>
      </div>

      <h3>Weekly Schedule</h3>
      <CalendarForm
        schedule={profileInputs.schedule}
        setSchedule={schedule => handleScheduleIn(schedule)}
      />

      <Button
        className={classes.btn}
        variant="contained"
        color="primary"
        onClick={handleFirstForm}
      >
        Submit
      </Button>
      {error ? <p id="error">{error}</p> : null}
    </Container>
  );
}

export default Profile;
