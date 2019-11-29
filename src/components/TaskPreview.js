import React from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

function minutesToHHMM(mins) {
  let h = Math.floor(mins / 60);
  let m = mins % 60;
  m = m < 10 ? "0" + m : m;

  let a = "AM";
  if (h >= 12) a = "PM";
  if (h > 12) h = h - 12;
  return `${h}:${m} ${a}`;
}

function EventReview(props) {
  const { title, start, end, pos } = props;

  const style = {
    position: "absolute",
    width: "22em",
    top: "-3em",
    padding: "1em",
    borderRadius: "1em",
    boxShadow: "-3px 4px 28px rgba(0,0,0,0.5), 10px 4px 10px rgba(0,0,0,0.5)",
    transition: "all 0.2s ease-in-out",
    zIndex: "10",
  };

  console.log(pos);
  console.log(pos.x);
  console.log(window.innerHeight);

  if (pos.x > 500) {
    console.log(pos.x);
    style.left = "-23em";
  } else if (window.innerWidth - pos.x - pos.width > 500) {
    style.right = "-23em";
  } else {
    style.top = "-15em";
  }

  return (
    <Card ref={props.previewRef} style={style}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {title}
        </Typography>
        <Typography gutterBottom component="p">
          {`${minutesToHHMM(start)} - ${minutesToHHMM(end)}`}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Hello the world. Just do something.... What... Exercise is good for your health
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Detail
        </Button>
      </CardActions>
    </Card>
  );
}

export default EventReview;
