import React, { useState } from "react";
import "./Nutrition.css";

// import { FirebaseContext } from "./Context/Firebase";
// import UserContext from "./Context/UserContext";

function Nutrition(props) {
  // const firebase = useContext(FirebaseContext);
  // const userData = useContext(UserContext);
  const [data, setData] = useState({});

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

  const nutritionLabel = itemID => {
    getNutritionalDataFromFDC(itemID).then(response => {
      setData(response);
      const portion = data.foodPortions[0].portionDescription;
      const foodNutrients = data.foodNutrients;
      let energy;
      let protein;
      let fat;
      let carbs;
      let sugars;
      let fiber;
      let water;
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
                  <td class="blank-cell"></td>
                  <th>Total lipid (fat) </th>
                  <td>
                    <b> {fat || "?"} g</b>
                  </td>
                </tr>
                <tr>
                  <td class="blank-cell"></td>
                  <th>Carbohydrate, by difference </th>
                  <td>
                    <b> {carbs || "?"} g</b>
                  </td>
                </tr>
                <tr>
                  <th class="blank-cell">
                    <b>Sugars</b>
                  </th>
                  <td>
                    <b>{sugars || "?"} g</b>
                  </td>
                </tr>
                <tr>
                  <th class="blank-cell">
                    <b>Water</b>
                  </th>
                  <td>
                    <b>{water || "?"} g</b>
                  </td>
                </tr>
                <tr>
                  <td class="blank-cell"></td>
                  <th>Dietary Fiber</th>
                  <td>
                    <b>{fiber || "?"} g</b>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>
      );
    });
  };

  return <div>{nutritionLabel(props.location.id)}</div>;
}

export default Nutrition;
