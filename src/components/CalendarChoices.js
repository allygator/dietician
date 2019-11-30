import React, { useState } from "react";

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

function CalendarChoices() {
  const [currTask, setCurrTask] = useState(0);

  const classes = useStyles();

  const possibleSchedules = formatTask(sampleTask);

  return (
    <div>
      <div className={classes.root}>
        <Grid container spacing={6}>
          <Grid item xs></Grid>
          <Grid item xs={3}>
            <Button variant="contained" color="primary">
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
  return [
    sampleTask.possibleSchedule.map(day => [
      {
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
      },
    ]),
    sampleTask.possibleSchedule.map(day => [
      {
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
      },
    ]),
  ];
};

const sampleTask = {
  wake: 390,
  sleep: 1320,
  mealDuration: 30,
  mealBuffer: 15,
  exerciseDuration: 60,
  exerciseBuffer: 15,
  possibleSchedule: [
    [
      {
        busy: [590, 660, 740, 1020, 1100, 1220],
        meals: [390, 690, 1035],
        exercise: [495],
      },
      {
        busy: [590, 660, 740, 1020, 1100, 1220],
        meals: [435, 690, 1035],
        exercise: [1235],
      },
    ],
    [
      {
        busy: [590, 660, 740, 1020, 1100, 1220],
        meals: [390, 690, 1035],
        exercise: [495],
      },
      {
        busy: [590, 660, 740, 1020, 1100, 1220],
        meals: [435, 690, 1035],
        exercise: [1235],
      },
    ],
    [
      {
        busy: [590, 660, 740, 1020, 1100, 1220],
        meals: [390, 690, 1035],
        exercise: [495],
      },
      {
        busy: [590, 660, 740, 1020, 1100, 1220],
        meals: [435, 690, 1035],
        exercise: [1235],
      },
    ],
    [
      {
        busy: [590, 660, 740, 1020, 1100, 1220],
        meals: [390, 690, 1035],
        exercise: [495],
      },
      {
        busy: [590, 660, 740, 1020, 1100, 1220],
        meals: [435, 690, 1035],
        exercise: [1235],
      },
    ],
    [
      {
        busy: [590, 660, 740, 1020, 1100, 1220],
        meals: [390, 690, 1035],
        exercise: [495],
      },
      {
        busy: [590, 660, 740, 1020, 1100, 1220],
        meals: [435, 690, 1035],
        exercise: [1235],
      },
    ],
    [
      {
        busy: [590, 660, 740, 1020, 1100, 1220],
        meals: [390, 690, 1035],
        exercise: [495],
      },
      {
        busy: [590, 660, 740, 1020, 1100, 1220],
        meals: [435, 690, 1035],
        exercise: [1235],
      },
    ],
    [
      {
        busy: [590, 660, 740, 1020, 1100, 1220],
        meals: [390, 690, 1035],
        exercise: [495],
      },
      {
        busy: [590, 660, 740, 1020, 1100, 1220],
        meals: [435, 690, 1035],
        exercise: [1235],
      },
    ],
  ],
};
