import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import Calendar from "./Calendar";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: "2rem",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  acceptBtn: {
    margin: "auto",
  },
  calendar: {
    fontSize: "0.9rem",
  },
}));

function CalendarChoices() {
  const classes = useStyles();

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
            <Button variant="outlined">{"< Prev"}</Button>

            <Button variant="outlined">Next ></Button>
          </Grid>
        </Grid>
      </div>

      <div className={classes.calendar}>
        <Calendar />
      </div>
    </div>
  );
}

export default CalendarChoices;
