import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import Calendar from "./Calendar";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: "2rem",
  },
  calendar: {
    fontSize: "0.9rem",
  },
}));

function CalendarChoices(props) {
  const [currTask, setCurrTask] = useState(0);
  const [tasks, setTasks] = useState(null);

  const classes = useStyles();

  useEffect(() => {
    if (props.response) setTasks({ ...props.response });
  }, [props.response]);

  console.log(tasks);

  const possibleSchedules = formatTask(tasks);

  return (
    <div>
      <div className={classes.root}>
        <Grid container spacing={6}>
          <Grid item xs></Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => props.onSubmit([...possibleSchedules[currTask]])}
            >
              Accept
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="outlined"
              onClick={() => setCurrTask((currTask + 2 - 1) % 2)}
            >
              {"< Prev"}
            </Button>

            <Button variant="outlined" onClick={() => setCurrTask((currTask + 1) % 2)}>
              Next >
            </Button>
          </Grid>
        </Grid>
      </div>

      <div className={classes.calendar}>
        <Calendar tasks={possibleSchedules[currTask]} />
      </div>
    </div>
  );
}

export default CalendarChoices;

const formatTask = sampleTask => {
  if (!sampleTask || !sampleTask.possibleSchedule) return [];
  return [
    sampleTask.possibleSchedule.map(day => ({
      meals: day[0].meals.map(meal => ({ start: meal, end: meal + 15 })),
      exercise: day[0].exercise.map(exercise => ({
        start: exercise,
        end: exercise + 30,
      })),
      busy: day[0].busy
        .map((element, index) =>
          index % 2 === 0 ? { start: element, end: day[0].busy[index + 1] } : 0
        )
        .filter(time => time !== 0),
    })),
    sampleTask.possibleSchedule.map(day => ({
      meals: day[1].meals.map(meal => ({ start: meal, end: meal + 15 })),
      exercise: day[1].exercise.map(exercise => ({
        start: exercise,
        end: exercise + 30,
      })),
      busy: day[1].busy
        .map((element, index) =>
          index % 2 === 0 ? { start: element, end: day[1].busy[index + 1] } : 0
        )
        .filter(time => time !== 0),
    })),
  ];
};
