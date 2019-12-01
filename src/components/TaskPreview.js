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
              <li>Sprouted Toast</li>
              <li>Cottage Cheese</li>
              <li>Avocado</li>
            </ul>
            <ul
              className={`${
                food === "Smoked Salmon Bagel" ? "show-detail" : "hide-detail"
              }`}
            >
              <li>Whole-Wheat Bagel</li>
              <li>Cream Cheese</li>
              <li>Smoked Salmon </li>
              <li>Alfalfa Sprouts</li>
            </ul>
            <ul
              className={`${
                food === "Sheet-Pan Chicken & Vegetables with Romesco Sauce"
                  ? "show-detail"
                  : "hide-detail"
              }`}
            >
              <li>Yukon Gold Potatoes</li>
              <li>Olive Oil</li>
              <li>Chicken, Thigh, Stewed, Without Skin</li>
              <li>Broccoli Florets</li>
              <li>Roasted Red Peppers</li>
              <li>Slivered Almonds</li>
            </ul>
            <ul
              className={`${
                food === "Pork Paprikash with Cauliflower Rice"
                  ? "show-detail"
                  : "hide-detail"
              }`}
            >
              <li>Natural Pork Tenderloin</li>
              <li>Chopped Cauliflower</li>
              <li>Olive Oil</li>
              <li>No-Salt-Added Diced Tomatoes With Basil, Garlic, and Oregano</li>
              <li>Reduced-Sodium Chicken Broth</li>
              <li>Mild Banana Peppers</li>
              <li>Light Sour Cream</li>
              <li>All-Purpose Flour</li>
              <li>Medium Onion</li>
            </ul>
            <ul
              className={`${
                food === "Superfood Chopped Salad with Salmon & Creamy Garlic Dressing"
                  ? "show-detail"
                  : "hide-detail"
              }`}
            >
              <li>Salmon Fillet</li>
              <li>Low-Fat Plain Yogurt</li>
              <li>Mayonnaise</li>
              <li>Lemon Juice</li>
              <li>Parmesan Cheese</li>
              <li>Chopped Curly Kale</li>
              <li>Chopped Broccoli</li>
              <li>Chopped Red Cabbage</li>
              <li>Diced Carrots</li>
            </ul>
            <ul
              className={`${
                food === "Slow-Cooker Braised Beef with Carrots & Turnips"
                  ? "show-detail"
                  : "hide-detail"
              }`}
            >
              <li>Red Wine</li>
              <li>Can Whole Tomatoes</li>
              <li>Medium Carrots</li>
              <li>Medium Turnips</li>
              <li>Beef Chuck Roast</li>
              <li>Olive Oil</li>
              <li>Medium Onion</li>
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
