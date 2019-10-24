import React, { useState } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import "./Calendar.css";

const DAYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

const HOURS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export default function Calendar() {
  const [weekDays, setWeekDays] = useState(getThreeDay());
  const [values, setValues] = useState({
    age: "",
    name: "hai"
  });

  const handleChange = ({ target }) => {
    const { value } = target;

    switch (value) {
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

    setValues(oldValues => ({
      ...oldValues,
      [target.name]: target.value
    }));
  };

  return (
    <div className="calendar">
      <div className="calendar__controller">
        <Select
          value={values.age}
          onChange={handleChange}
          inputProps={{
            name: "age",
            id: "age-simple"
          }}
        >
          <MenuItem value={1}>Day</MenuItem>
          <MenuItem value={3}>3 Day</MenuItem>
          <MenuItem value={7}>Week</MenuItem>
        </Select>
      </div>
      <div className="calendar__column__wrapper">
        <div className="calendar__column__timetsamps">
          <div className="calendar__day" />
        </div>
        {weekDays.map(renderDays)}
      </div>
    </div>
  );
}

function renderDays({ day, date, isToday }) {
  return (
    <div className="calendar__column">
      <div className="calendar__day">
        <div className="calendar__day__name">{DAYS[day]}</div>
        <div className="calendar__day__number-wrapper">
          <div
            className={
              "calendar__day__number " +
              (isToday ? "calendar__day__number--today" : "")
            }
          >
            {date}
          </div>
        </div>
      </div>
      <div className="calendar__time">
        <div className="calendar__time__map">
          {HOURS.map(() => (
            <div className="calendar__time__map__hour" />
          ))}
        </div>
      </div>
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
      day: d.getDay(),
      date: d.getDate(),
      isToday: true
    }
  ];
}

function getThreeDay() {
  const d = new Date();
  const today = d.getDate();
  const day = d.getDay();
  const days = [];

  for (let i = 0; i < 3; i++)
    days.push({ day: day + i, date: today + i, isToday: i === 0 });

  return days;
}

function getWeekDays() {
  const d = new Date();
  const today = d.getDate();
  const base = today - d.getDay();
  const days = [];
  let date;

  for (let i = 0; i < 7; i++) {
    date = base + i;
    days.push({ day: i, date, isToday: today === date });
  }

  return days;
}
