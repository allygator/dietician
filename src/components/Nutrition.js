import React, { useState, useEffect } from "react";
import "./Nutrition.css";

// import { FirebaseContext } from "./Context/Firebase";
// import UserContext from "./Context/UserContext";

function Nutrition(props) {
  // const firebase = useContext(FirebaseContext);
  // const userData = useContext(UserContext);
  const [data, setData] = useState({});

  useEffect(() => {
    getNutritionalDataFromFDC(props.location.id).then(response => {
      setData(response);
      console.log(data);
    });
  }, []);

  async function getNutritionalDataFromFDC(itemID) {
    try {
      const response = await fetch(
        `https://api.nal.usda.gov/fdc/v1/${itemID}?api_key=${process.env.REACT_APP_FDC_API}`
      );
      const responseJson = await response.json();
      console.log(responseJson);
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  }

  let portion;
  let energy;
  let protein;
  let fat;
  let carbs;
  let sugars;
  let fiber;
  let water;

  if (data.foodPortions) {
    portion =
      (data.foodPortions &&
        data.foodPortions[0] &&
        data.foodPortions[0].portionDescription) ||
      "1 unit";
    const foodNutrients = data.foodNutrients;

    foodNutrients.forEach(nutrient => {
      switch (nutrient.nutrient.name) {
        case "Protein":
          protein = nutrient.amount;
          break;
        case "Total lipid (fat)":
          fat = nutrient.amount;
          break;
        case "Carbohydrate, by difference":
          carbs = nutrient.amount;
          break;
        case "Energy":
          energy = nutrient.amount;
          break;
        case "Sugars, total including NLEA":
          sugars = nutrient.amount;
          break;
        case "Fiber, total dietary":
          fiber = nutrient.amount;
          break;
        case "Water":
          water = nutrient.amount;
          break;
        default:
          break;
      }
    });
  }

  return (
    <div>
      <section class="performance-facts">
        <header class="performance-facts__header">
          <h1>{props.location.name}</h1>
          <h1 class="performance-facts__title">Nutrition Facts</h1>
          <p>Serving Size {portion}</p>
        </header>
        <table class="performance-facts__table">
          <thead>
            <tr>
              <th colspan="3" class="small-info">
                Amount Per Serving
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th colspan="2">
                <b>Calories </b>
              </th>
              <td>
                <b>{energy || "?"} kcal</b>
              </td>
            </tr>
            <tr>
              <th colspan="2">
                <b>Protein </b>
              </th>
              <td>
                <b> {protein || "?"} g</b>
              </td>
            </tr>
            <tr>
              <th colspan="2">
                <b>Total lipid (fat)</b>
              </th>
              <td>
                <b> {fat || "?"} g</b>
              </td>
            </tr>
            <tr>
              <th colspan="2">
                <b>Carbohydrate, by difference</b>
              </th>
              <td>
                <b> {carbs || "?"} g</b>
              </td>
            </tr>
            <tr>
              <th colspan="2">
                <b>Sugars</b>
              </th>
              <td>
                <b>{sugars || "?"} g</b>
              </td>
            </tr>
            <tr>
              <th colspan="2">
                <b>Water</b>
              </th>
              <td>
                <b>{water || "?"} g</b>
              </td>
            </tr>
            <tr>
              <th colspan="2">
                <b>Dietary Fiber</b>
              </th>
              <td>
                <b>{fiber || "?"} g</b>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Nutrition;
