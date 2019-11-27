import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  card: {
    position: "absolute",
    zIndex: "10",
    top: "-2em",
    left: "10em",
    width: "22em",
    borderRadius: "1em",
    boxShadow: "-3px 4px 28px rgba(0,0,0,0.5), 10px 4px 10px rgba(0,0,0,0.5)",
    padding: "1em",
  },
});

function minutesToHHMM(mins) {
  let h = Math.floor(mins / 60);
  let m = mins % 60;
  m = m < 10 ? "0" + m : m;

  let a = "AM";
  if (h >= 12) a = "PM";
  if (h > 12) h = h - 12;
  return `${h}:${m} ${a}`;
}

export default function EventReview(props) {
  const { title, start, end } = props;
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader
        title={title}
        subheader={`${minutesToHHMM(start)} - ${minutesToHHMM(end)}`}
      />
      <CardContent>
        <p>Just do some excerce. Some random text. What..... Just do something...</p>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Detail
        </Button>
      </CardActions>
    </Card>
  );
}
