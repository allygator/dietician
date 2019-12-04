import React from "react";
import "./Nutrition.css";

// import { FirebaseContext } from "./Context/Firebase";
// import UserContext from "./Context/UserContext";

function Nutrition(props) {
  // const firebase = useContext(FirebaseContext);
  // const userData = useContext(UserContext);

  function getIDFromDatabase() {}

  async function getNutritionalDataFromFDC(itemID) {
    try {
      const response = await fetch(
        `https://api.nal.usda.gov/fdc/v1/${itemID}?api_key=${process.env.REACT_APP_FDC_API}`
      );
      const responseJson = await response.json();
      // const nutrition = {
      //   description: responseJson.description,
      //   servingSize: responseJson.servingSize,
      //   servingSizeUnit: responseJson.servingSizeUnit,
      // };
      // if (responseJson.labelNutrients) {
      //   nutrition["labelNutrients"] = responseJson.labelNutrients;
      // }
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  }

  const nutritionLabel = itemID => {
    const data = getNutritionalDataFromFDC(itemID);
    const portion = data.foodPortions.portionDescription;
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
  };

  return (
    <div onClick={getIDFromDatabase}>
      {props.location.id === 339622
        ? nutritionLabel(205, 14.3, 0, 36.82, 46.61, 2.86, 5.7)
        : props.location.id === 336750
        ? nutritionLabel(81, 10.45, 2.27, 4.76, 81.24, 4, 0)
        : props.location.id === 562115
        ? nutritionLabel(167, 0, 15, 10, "?", 6.7, 6.7)
        : props.location.id === 339638
        ? nutritionLabel(250, 10.2, 1.53, 48.89, 37.55, 6.12, 4.1)
        : props.location.id === 173418
        ? nutritionLabel(350, 6.15, 34.44, 5.52, 52.62, 3.76, 0)
        : props.location.id === 538283
        ? nutritionLabel(127, 21.82, 1.82, 3.64, "?", 0, 1.8)
        : props.location.id === 342592
        ? nutritionLabel(23, 3.99, 0.69, 2.1, 92.82, 0.2, 1.9)
        : ""}
    </div>
  );
}

export default Nutrition;
