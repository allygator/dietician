import React, { useState, useEffect, useContext } from "react";

import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";

import { FirebaseContext } from "./Context/Firebase";
import UserContext from "./Context/UserContext";

import TaskBlock from "./TaskBlock";

import "./Calendar.css";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  mr: {
    marginRight: theme.spacing(1),
  },
}));

const DAYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
const HOURS = fillHours();

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

export default function Calendar(props) {
  const classes = useStyles();

  const firebase = useContext(FirebaseContext);
  const userData = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(true);
  const [weekDays, setWeekDays] = useState(getWeekDays());
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (props.tasks) setTasks(props.tasks);

    // Are we logged in
    if (userData.authUser) {
      firebase.db
        .collection("users")
        .doc(userData.authUser.uid)
        .get()
        .then(x => {
          const { fullSchedule = sampleTask } = x.data();
          if (fullSchedule) {
            const possibleSchedules = formatTask(fullSchedule);
            setTasks(possibleSchedules[0]);
          }
          setIsLoading(false);
        })
        .catch(err => console.log("err", err));
    }
  }, [props.tasks, firebase.db, userData.authUser]);

  const handleChange = ({ target }) => {
    const { value } = target;

    switch (Number(value)) {
      case 1:
        setWeekDays(getDay());
        break;
      case 3:
        setWeekDays(getThreeDay());
        break;
      case 7:
        setWeekDays(getWeekDays());
        break;
      default:
        break;
    }
  };

  return (
    <div className="calendar">
      {isLoading ? (
        <div className="calendar__loading__wrapper">
          <CircularProgress />
        </div>
      ) : (
        <div>
          <div className="calendar__nav__header">
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="grouped-native-select">Dates</InputLabel>
              <Select
                native
                defaultValue={7}
                input={<Input id="grouped-native-select" />}
                onChange={handleChange}
              >
                <option value={1}>Day</option>
                <option value={3}>3 Day</option>
                <option value={7}>Week</option>
              </Select>
            </FormControl>
          </div>
          <div className="calendar__day__header">
            <div className="calendar__day__gap" />
            {weekDays.map(renderDays)}
          </div>
          <div className="calendar__time__container">
            <div className="calendar__time__column">{HOURS.map(renderHours)}</div>
            {weekDays.map((x, index) => (
              // columns based of the number of days being shown
              <div
                key={index}
                className="calendar__time__column"
                style={{ flex: "1 1 100%" }}
              >
                {HOURS.map((x, index) => (
                  <div key={index} className="calendar__time__row">
                    <span />
                  </div>
                ))}

                {tasks[index]
                  ? tasks[index][0].meals.map((block, index) => (
                      <TaskBlock
                        key={index}
                        type="Food"
                        start={block.start}
                        end={block.end}
                      />
                    ))
                  : null}
                {tasks[index]
                  ? tasks[index][0].exercise.map((block, index) => (
                      <TaskBlock
                        key={index}
                        type="Exercise"
                        start={block.start}
                        end={block.end}
                      />
                    ))
                  : null}
                {tasks[index]
                  ? tasks[index][0].busy.map((block, index) => (
                      <TaskBlock
                        key={index}
                        type="Work"
                        start={block.start}
                        end={block.end}
                      />
                    ))
                  : null}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function renderDays({ day, date, isToday }, index) {
  return (
    <div
      key={index}
      className={`calendar__day__column ${isToday ? "calendar__day__column--today" : ""}`}
      style={{ flex: "1 1 100%" }}
    >
      <span>{date}</span>
      <span>{day}</span>
    </div>
  );
}

function renderHours({ timeString }, index) {
  return (
    <div key={index} className="calendar__time__row">
      <div className="calendar__time__gap">{timeString}</div>
    </div>
  );
}

/**
 * The following functions will return an array
 * of day objects defined below
 *
 * {
 *   day: number,
 *   isToday: boolean
 * }
 */

function getDay() {
  const d = new Date();

  return [
    {
      day: DAYS[d.getDay()],
      date: d.getDate(),
      isToday: true,
    },
  ];
}

function getThreeDay() {
  const d = new Date();
  const days = [];

  for (let i = 0; i < 3; i++) {
    days.push({
      day: DAYS[d.getDay()],
      date: d.getDate(),
      isToday: i === 0,
    });
    d.setDate(d.getDate() + 1);
  }

  return days;
}

function getWeekDays() {
  const d = new Date();
  const today = d.getDay();
  const days = [];

  // set the date to the beginning of the week i.e Sunday
  d.setDate(d.getDate() - d.getDay());

  for (let i = 0; i < 7; i++) {
    days.push({
      day: DAYS[d.getDay()],
      date: d.getDate(),
      isToday: i === today,
    });
    d.setDate(d.getDate() + 1);
  }

  return days;
}

/**
 * Aux Functions
 */

function fillHours() {
  const hours = [{ time: 12, timeString: "12a" }];
  for (let j = 0; j < 2; j++) {
    for (let i = 1; i <= 12 - j; i++)
      hours.push({ time: i, timeString: `${i}${j === 0 ? "a" : "p"}` });
  }
  return hours;
}

function formatTask(sampleTask) {
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
}
