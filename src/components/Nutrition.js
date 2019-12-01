import React from "react";
import "./Nutrition.css";

function Nutrition(props) {
  // async function getNutritionalDataFromFDC(itemID) {
  //   try {
  //     const response = await fetch(
  //       `https://api.nal.usda.gov/fdc/v1/${itemID}?api_key=${process.env.REACT_APP_FDC_API}`
  //     );
  //     const responseJson = await response.json();
  //     const nutrition = {
  //       description: responseJson.description,
  //       servingSize: responseJson.servingSize,
  //       servingSizeUnit: responseJson.servingSizeUnit,
  //     };
  //     if (responseJson.labelNutrients) {
  //       nutrition["labelNutrients"] = responseJson.labelNutrients;
  //     }
  //     return nutrition;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  const lul = (
    <div>
      <section class="performance-facts">
        <header class="performance-facts__header">
          <h1 class="performance-facts__title">Nutrition Facts</h1>
          <p>Serving Size 100 g</p>
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
                <b> 200 kcal</b>
              </td>
            </tr>
            <tr>
              <th colspan="2">
                <b>Protein </b>
              </th>
              <td>
                <b> 14.3g</b>
              </td>
            </tr>
            <tr>
              <td class="blank-cell"></td>
              <th>Total lipid (fat) </th>
              <td>
                <b> 0g</b>
              </td>
            </tr>
            <tr>
              <td class="blank-cell"></td>
              <th>Carbohydrate, by difference </th>
              <td>
                <b> 36.82g</b>
              </td>
            </tr>
            <tr>
              <th colspan="2">
                <b>Alcohol, ethyl</b>
              </th>
              <td>
                <b> 0g</b>
              </td>
            </tr>
            <tr>
              <th colspan="2">
                <b>Water</b>
              </th>
              <td>
                <b>46.61g</b>
              </td>
            </tr>
            <tr>
              <th colspan="2">
                <b>Sugars</b>
              </th>
              <td>
                <b>2.86g</b>
              </td>
            </tr>
            <tr>
              <td class="blank-cell"></td>
              <th>Dietary Fiber</th>
              <td>
                <b>5.7g</b>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );

  return <div>{lul}</div>;
}

export default Nutrition;
