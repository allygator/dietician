import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Calendar from "../Calendar";

const useStyles = makeStyles(theme => ({
  root: {
    height: "50rem",
    fontSize: "0.8rem",
    zIndex: "30",
  },
}));

function CalendarForm(props) {
  const { schedule, setSchedule } = props;
  const classes = useStyles();

  const handleAddingTask = (index, time) => {
    const updatedWeeklyTasks = [...schedule];

    // Convert time string to minutes
    const start = time.start.split(":");
    const startMinutes = +start[0] * 60 + +start[1];

    const end = time.end.split(":");
    const endMinutes = +end[0] * 60 + +end[1];

    updatedWeeklyTasks[index].push({ start: startMinutes, end: endMinutes });
    setSchedule(updatedWeeklyTasks);
  };

  return (
    <div className={classes.root}>
      <Calendar
        editable
        tasks={formatSchedule(schedule)}
        handleAddingTask={handleAddingTask}
      />
    </div>
  );
}

export default CalendarForm;

const formatSchedule = weeklyTasks => {
  return weeklyTasks.map(dailyTask => ({
    busy: dailyTask.map(task => ({
      start: task.start,
      end: task.end,
      type: "Work",
    })),
  }));
};
