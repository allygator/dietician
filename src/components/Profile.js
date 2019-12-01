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

  const [error, setError] = useState("");
  const [profileInputs, setProfile] = useState({
    firstName: "",
    lastName: "",
    height: "",
    weight: "",
    age: "",
    gender: "",
    schedule: [[], [], [], [], [], [], []],
  });
  const [submitted, setSubmitted] = useState(false);
  const [response, setResponse] = useState({});

  const classes = useStyles();

  useEffect(() => {
    setError("");
  }, [profileInputs]);

  const handleChangeIn = name => event => {
    setProfile({ ...profileInputs, [name]: event.target.value });
  };

  const handleScheduleIn = value => {
    setProfile({ ...profileInputs, schedule: value });
  };

  const handleFirstForm = () => {
    const { firstName, lastName, height, weight, age, gender } = profileInputs;

    if (!firstName || !lastName || !height || !weight || !age || !gender) {
      setError("Please enter all require fields");
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

    fetch("http://localhost:34567/.netlify/functions/schedule", {
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

    // firebase.db
    //   .collection("users")
    //   .doc(userData.authUser.uid)
    //   .set({ firstName, lastName, height, age: parseInt(age), gender, busySchedule })
    //   .then(() => {
    //     // Success: do something here
    //     console.log("success");
    //   })
    //   .catch(err => {
    //     console.log("err", err);
    //   });
  };

  const handleSecondForm = schedule => {
    const { firstName, lastName, height, weight, age, gender } = profileInputs;

    firebase.db
      .collection("users")
      .doc(userData.authUser.uid)
      .set({
        firstName,
        lastName,
        weight: parseInt(weight),
        height,
        age: parseInt(age),
        gender,
        fullSchedule: Object.assign({}, schedule),
      })
      .then(() => {
        // Success: do something here
        console.log("success");
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
    <Container className={classes.root}>
      <h3> Personal Information</h3>
      <div className={classes.inputGroup}>
        <FormControl className={classes.formControl}>
          <FormLabel component="legend">First Name</FormLabel>
          <TextField
            value={profileInputs.firstName}
            label="Enter"
            variant="outlined"
            required={true}
            multiline
            onChange={handleChangeIn("firstName")}
            fullWidth
            margin="normal"
          />
        </FormControl>

        <FormControl className={classes.formControl}>
          <FormLabel component="legend">Last Name</FormLabel>
          <TextField
            value={profileInputs.lastName}
            label="Enter"
            variant="outlined"
            required={true}
            onChange={handleChangeIn("lastName")}
            fullWidth
            margin="normal"
          />
        </FormControl>
      </div>
      <div className={classes.inputGroup}>
        <FormControl className={classes.formControl}>
          <FormLabel component="legend">Height</FormLabel>

          <TextField
            value={profileInputs.height}
            label="feet"
            variant="outlined"
            required={true}
            multiline
            onChange={handleChangeIn("height")}
            fullWidth
            margin="normal"
          />
        </FormControl>

        <FormControl className={classes.formControl}>
          <FormLabel component="legend">Weight</FormLabel>

          <TextField
            id="weight"
            value={profileInputs.weight}
            label="lbs"
            variant="outlined"
            required={true}
            onChange={handleChangeIn("weight")}
            fullWidth
            margin="normal"
          />
        </FormControl>
      </div>
      <div className={classes.inputGroup}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Age</FormLabel>
          <TextField
            id="age"
            value={profileInputs.age}
            label="Enter"
            variant="outlined"
            required={true}
            onChange={handleChangeIn("age")}
            fullWidth
            margin="normal"
          />
        </FormControl>
      </div>
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
      {error ? <p>{error}</p> : null}
    </Container>
  );
}

export default Profile;
