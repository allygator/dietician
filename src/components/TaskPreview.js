import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

import "./TaskPreview.css";

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
  const [showDetail, setShowDetail] = useState(false);
  const rand = Math.round(Math.random());

  const food =
    props.time === 0
      ? rand === 0
        ? "Cottage Cheese Toast"
        : "Smoked Salmon Bagel"
      : props.time === 1
      ? rand === 0
        ? "Sheet-Pan Chicken & Vegetables with Romesco Sauce"
        : "Pork Paprikash with Cauliflower Rice"
      : rand === 0
      ? "Superfood Chopped Salad with Salmon & Creamy Garlic Dressing"
      : "Slow-Cooker Braised Beef with Carrots & Turnips";

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

  if (pos.x > 500) {
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
        <Typography>
          <ul
            className={`${
              showDetail && props.title === "Exercise" ? "show-detail" : "hide-detail"
            }`}
          >
            <li>30-second Sprint Intervals</li>
            <li>Side Stepping Workout</li>
            <li>Calorie-Blasting Pyramid Workout</li>
            <li>Barbell Squats</li>
            <li>Walking Lunges</li>
            <li>Deadlifts</li>
            <li>Barbell Chest Press</li>
          </ul>
          <div
            className={`${
              showDetail && props.title === "Food" ? "show-detail" : "hide-detail"
            }`}
          >
            {food}
            <ul
              className={`${
                food === "Cottage Cheese Toast" ? "show-detail" : "hide-detail"
              }`}
            >
              <li>sprouted toast</li>
              <li>cottage cheese</li>
              <li>avocado</li>
            </ul>
            <ul
              className={`${
                food === "Smoked Salmon Bagel" ? "show-detail" : "hide-detail"
              }`}
            >
              <li>whole-wheat bagel</li>
              <li>cream cheese</li>
              <li>smoked salmon </li>
              <li>alfalfa sprouts</li>
            </ul>
            <ul
              className={`${
                food === "Sheet-Pan Chicken & Vegetables with Romesco Sauce"
                  ? "show-detail"
                  : "hide-detail"
              }`}
            >
              <li>Yukon Gold potatoes</li>
              <li>Olive oil</li>
              <li>Chicken, thigh, stewed, skin not eaten</li>
              <li>broccoli florets</li>
              <li>roasted red peppers</li>
              <li>slivered almonds</li>
            </ul>
            <ul
              className={`${
                food === "Pork Paprikash with Cauliflower Rice"
                  ? "show-detail"
                  : "hide-detail"
              }`}
            >
              <li>natural pork tenderloin</li>
              <li>chopped cauliflower</li>
              <li>Olive oil</li>
              <li>
                no-salt-added diced tomatoes with basil, garlic, and oregano, undrained
              </li>
              <li>reduced-sodium chicken broth</li>
              <li>mild banana peppers</li>
              <li>light sour cream</li>
              <li>all-purpose flour</li>
              <li>medium onion</li>
            </ul>
            <ul
              className={`${
                food === "Superfood Chopped Salad with Salmon & Creamy Garlic Dressing"
                  ? "show-detail"
                  : "hide-detail"
              }`}
            >
              <li>salmon fillet</li>
              <li>low-fat plain yogurt</li>
              <li>mayonnaise</li>
              <li>lemon juice</li>
              <li>Parmesan cheese</li>
              <li>chopped curly kale</li>
              <li>chopped broccoli</li>
              <li>chopped red cabbage</li>
              <li>diced carrots</li>
            </ul>
            <ul
              className={`${
                food === "Slow-Cooker Braised Beef with Carrots & Turnips"
                  ? "show-detail"
                  : "hide-detail"
              }`}
            >
              <li>red wine</li>
              <li>can whole tomatoes</li>
              <li>medium carrots</li>
              <li>medium turnips</li>
              <li>beef chuck roast</li>
              <li>Olive oil</li>
              <li>medium onion</li>
            </ul>
          </div>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={() => setShowDetail(!showDetail)}>
          {`${showDetail ? "Hide " : ""}`}Detail
        </Button>
      </CardActions>
    </Card>
  );
}

export default EventReview;
