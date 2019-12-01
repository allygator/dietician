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
import CalendarTimeRow from "./CalendarForm/CalendarTimeRow";

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

// const sampleTask = [
//   {
//     meals: [{ start: 405, end: 420 }, { start: 660, end: 675 }, { start: 915, end: 930 }],
//     exercise: [{ start: 315, end: 345 }],
//     busy: [{ start: 240, end: 300 }],
//   },
//   {
//     meals: [
//       { start: 585, end: 600 },
//       { start: 840, end: 855 },
//       { start: 1095, end: 1110 },
//     ],
//     exercise: [{ start: 495, end: 525 }],
//     busy: [{ start: 420, end: 480 }],
//   },
//   {
//     meals: [{ start: 345, end: 360 }, { start: 600, end: 615 }, { start: 855, end: 870 }],
//     exercise: [{ start: 255, end: 285 }],
//     busy: [{ start: 180, end: 240 }],
//   },
//   {
//     meals: [
//       { start: 480, end: 495 },
//       { start: 735, end: 750 },
//       { start: 990, end: 1005 },
//     ],
//     exercise: [{ start: 390, end: 420 }],
//     busy: [{ start: 840, end: 900 }],
//   },
//   {
//     meals: [{ start: 465, end: 480 }, { start: 720, end: 735 }, { start: 975, end: 990 }],
//     exercise: [{ start: 375, end: 405 }],
//     busy: [{ start: 300, end: 360 }],
//   },
//   {
//     meals: [
//       { start: 585, end: 600 },
//       { start: 840, end: 855 },
//       { start: 1095, end: 1110 },
//     ],
//     exercise: [{ start: 495, end: 525 }],
//     busy: [{ start: 420, end: 480 }],
//   },
//   {
//     meals: [
//       { start: 480, end: 495 },
//       { start: 735, end: 750 },
//       { start: 990, end: 1005 },
//     ],
//     exercise: [{ start: 390, end: 420 }],
//     busy: [],
//   },
// ];

export default function Calendar(props) {
  const classes = useStyles();

  const firebase = useContext(FirebaseContext);
  const userData = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(true);
  const [weekDays, setWeekDays] = useState(getWeekDays());
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (props.tasks) {
      setTasks(props.tasks);
      setIsLoading(false);
    } else {
      // Are we logged in
      if (userData.authUser) {
        firebase.db
          .collection("users")
          .doc(userData.authUser.uid)
          .get()
          .then(doc => {
            // const { fullSchedule = sampleTask } = x.data();
            const { fullSchedule = [] } = doc.data();
            setTasks(fullSchedule);
          })
          .catch(err => console.log("err", err))
          .finally(() => setIsLoading(false));
      }
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
                {HOURS.map((x, i) => {
                  if (props.editable) {
                    return (
                      <CalendarTimeRow
                        key={i}
                        className="calendar__time__row"
                        start={i}
                        end={i + 1}
                        index={index}
                        handleAddingTask={props.handleAddingTask}
                      />
                    );
                  } else {
                    return (
                      <div key={i} className="calendar__time__row">
                        <span />
                      </div>
                    );
                  }
                })}

                {tasks[index] && tasks[index].meals
                  ? tasks[index].meals.map((block, index) => (
                      <TaskBlock
                        key={index}
                        type="Food"
                        start={block.start}
                        end={block.end}
                      />
                    ))
                  : null}
                {tasks[index] && tasks[index].exercise
                  ? tasks[index].exercise.map((block, index) => (
                      <TaskBlock
                        key={index}
                        type="Exercise"
                        start={block.start}
                        end={block.end}
                      />
                    ))
                  : null}
                {tasks[index] && tasks[index].busy
                  ? tasks[index].busy.map((block, index) => (
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
