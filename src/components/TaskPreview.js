import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

import "./TaskPreview.css";

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
        <Typography variant="body2" color="textSecondary" component="p"></Typography>
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
              <Link
                to={{
                  pathname: "/nutrition",
                  id: 339622,
                  name: "Sprouted Toast",
                }}
              >
                <li>Sprouted Toast</li>
              </Link>
              <Link
                to={{
                  pathname: "/nutrition",
                  id: 336750,
                  name: "Cottage Cheese",
                }}
              >
                <li>Cottage Cheese</li>
              </Link>

              <Link
                to={{
                  pathname: "/nutrition",
                  id: 562115,
                  name: "Avocado",
                }}
              >
                <li>Avocado</li>
              </Link>
            </ul>
            <ul
              className={`${
                food === "Smoked Salmon Bagel" ? "show-detail" : "hide-detail"
              }`}
            >
              <Link
                to={{
                  pathname: "/nutrition",
                  id: 339638,
                  name: "Whole-Wheat Bagel",
                }}
              >
                <li>Whole-Wheat Bagel</li>
              </Link>
              <Link
                to={{
                  pathname: "/nutrition",
                  id: 173418,
                  name: "Cream Cheese",
                }}
              >
                <li>Cream Cheese</li>
              </Link>
              <Link
                to={{
                  pathname: "/nutrition",
                  id: 538283,
                  name: "Smoked Salmon ",
                }}
              >
                <li>Smoked Salmon </li>
              </Link>
              <Link
                to={{
                  pathname: "/nutrition",
                  id: 342592,
                  name: "Alfalfa Sprouts",
                }}
              >
                <li>Alfalfa Sprouts</li>
              </Link>
            </ul>
            <ul
              className={`${
                food === "Sheet-Pan Chicken & Vegetables with Romesco Sauce"
                  ? "show-detail"
                  : "hide-detail"
              }`}
            >
              <Link
                to={{
                  pathname: "/nutrition",
                  id: 472938,
                  name: "Yukon Gold Potatoes",
                }}
              >
                <li>Yukon Gold Potatoes</li>
              </Link>
              <Link
                to={{
                  pathname: "/nutrition",
                  id: 343873,
                  name: "Olive Oil",
                }}
              >
                <li>Olive Oil</li>
              </Link>
              <Link
                to={{
                  pathname: "/nutrition",
                  id: 337248,
                  name: "Chicken, Thigh, Stewed, Without Skin",
                }}
              >
                <li>Chicken, Thigh, Stewed, Without Skin</li>
              </Link>
              <Link
                to={{
                  pathname: "/nutrition",
                  id: 449411,
                  name: "Broccoli Florets",
                }}
              >
                <li>Broccoli Florets</li>
              </Link>
              <Link
                to={{
                  pathname: "/nutrition",
                  id: 389019,
                  name: "Roasted Red Peppers",
                }}
              >
                <li>Roasted Red Peppers</li>
              </Link>
              <Link
                to={{
                  pathname: "/nutrition",
                  id: 415959,
                  name: "Slivered Almonds",
                }}
              >
                <li>Slivered Almonds</li>
              </Link>
            </ul>
            <ul
              className={`${
                food === "Pork Paprikash with Cauliflower Rice"
                  ? "show-detail"
                  : "hide-detail"
              }`}
            >
              <Link
                to={{
                  pathname: "/nutrition",
                  id: 336941,
                  name: "Natural Pork Tenderloin",
                }}
              >
                <li>Natural Pork Tenderloin</li>
              </Link>
              <Link
                to={{
                  pathname: "/nutrition",
                  id: 555592,
                  name: "Chopped Cauliflower",
                }}
              >
                <li>Chopped Cauliflower</li>
              </Link>
              <Link
                to={{
                  pathname: "/nutrition",
                  id: 343873,
                  name: "Olive Oil",
                }}
              >
                <li>Olive Oil</li>
              </Link>
              <Link
                to={{
                  pathname: "/nutrition",
                  id: 170458,
                  name: "No-Salt-Added Diced Tomatoes With Basil, Garlic, and Oregano",
                }}
              >
                <li>No-Salt-Added Diced Tomatoes With Basil, Garlic, and Oregano</li>
              </Link>
              <Link
                to={{
                  pathname: "/nutrition",
                  id: 172888,
                  name: "Reduced-Sodium Chicken Broth",
                }}
              >
                <li>Reduced-Sodium Chicken Broth</li>
              </Link>
              <Link
                to={{
                  pathname: "/nutrition",
                  id: 527323,
                  name: "Mild Banana Peppers",
                }}
              >
                <li>Mild Banana Peppers</li>
              </Link>
              <Link
                to={{
                  pathname: "/nutrition",
                  id: 409666,
                  name: "Light Sour Cream",
                }}
              >
                <li>Light Sour Cream</li>
              </Link>
              <Link
                to={{
                  pathname: "/nutrition",
                  id: 450703,
                  name: "All-Purpose Flour",
                }}
              >
                <li>All-Purpose Flour</li>
              </Link>
              <Link
                to={{
                  pathname: "/nutrition",
                  id: 170000,
                  name: "Medium Onion",
                }}
              >
                <li>Medium Onion</li>
              </Link>
            </ul>
            <ul
              className={`${
                food === "Superfood Chopped Salad with Salmon & Creamy Garlic Dressing"
                  ? "show-detail"
                  : "hide-detail"
              }`}
            >
              <Link
                to={{
                  pathname: "/nutrition",
                  id: 531790,
                  name: "Salmon Fillet",
                }}
              >
                <li>Salmon Fillet</li>
              </Link>
              <Link
                to={{
                  pathname: "/nutrition",
                  id: 531790,
                  name: "Low-Fat Plain Yogurt",
                }}
              >
                <li>Low-Fat Plain Yogurt</li>
              </Link>
              <Link
                to={{
                  pathname: "/nutrition",
                  id: 401221,
                  name: "Mayonnaise",
                }}
              >
                <li>Mayonnaise</li>
              </Link>
              <Link
                to={{
                  pathname: "/nutrition",
                  id: 549287,
                  name: "Lemon Juice",
                }}
              >
                <li>Lemon Juice</li>
              </Link>
              <Link
                to={{
                  pathname: "/nutrition",
                  id: 402750,
                  name: "Parmesan Cheese",
                }}
              >
                <li>Parmesan Cheese</li>
              </Link>
              <Link
                to={{
                  pathname: "/nutrition",
                  id: 474729,
                  name: "Chopped Curly Kale",
                }}
              >
                <li>Chopped Curly Kale</li>
              </Link>
              <Link
                to={{
                  pathname: "/nutrition",
                  id: 491942,
                  name: "Chopped Broccoli",
                }}
              >
                <li>Chopped Broccoli</li>
              </Link>
              <Link
                to={{
                  pathname: "/nutrition",
                  id: 343651,
                  name: "Chopped Red Cabbage",
                }}
              >
                <li>Chopped Red Cabbage</li>
              </Link>
              <Link
                to={{
                  pathname: "/nutrition",
                  id: 460639,
                  name: "Diced Carrots",
                }}
              >
                <li>Diced Carrots</li>
              </Link>
            </ul>
            <ul
              className={`${
                food === "Slow-Cooker Braised Beef with Carrots & Turnips"
                  ? "show-detail"
                  : "hide-detail"
              }`}
            >
              <Link
                to={{
                  pathname: "/nutrition",
                  id: 344507,
                  name: "Red Wine",
                }}
              >
                <li>Red Wine</li>
              </Link>
              <Link
                to={{
                  pathname: "/nutrition",
                  id: 170501,
                  name: "Can Whole Tomatoes",
                }}
              >
                <li>Can Whole Tomatoes</li>
              </Link>
              <Link
                to={{
                  pathname: "/nutrition",
                  id: 342354,
                  name: "Medium Carrots",
                }}
              >
                <li>Medium Carrots</li>
              </Link>
              <Link
                to={{
                  pathname: "/nutrition",
                  id: 170470,
                  name: "Medium Turnips",
                }}
              >
                <li>Medium Turnips</li>
              </Link>
              <Link
                to={{
                  pathname: "/nutrition",
                  id: 534539,
                  name: "Beef Chuck Roast",
                }}
              >
                <li>Beef Chuck Roast</li>
              </Link>
              <Link
                to={{
                  pathname: "/nutrition",
                  id: 343873,
                  name: "Olive Oil",
                }}
              >
                <li>Olive Oil</li>
              </Link>
              <Link
                to={{
                  pathname: "/nutrition",
                  id: 170000,
                  name: "Medium Onion",
                }}
              >
                <li>Medium Onion</li>
              </Link>
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
