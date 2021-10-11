import React, { useContext, useEffect } from "react";
import "./NutritionFactsTable.css";
import { FoodListContext } from "../../Context/foodList-context";

const NutritionFactsTable = ({ onSetHlMacro }) => {
  const nutriFactsCtx = useContext(FoodListContext);

  const { color, foodCategory, id, input, macros, name, url } =
    nutriFactsCtx.sflarr[0];

  const [
    energy,
    fats,
    carbs,
    protein,
    water,
    iron,
    magnesium,
    phosphorus,
    potassium,
    sodium,
    zinc,
    vitaminA,
    vitaminE,
    vitaminD,

    vitaminC,
    cholesterol,
    satFats,
    monoFats,
    polyFats,
    transFats,
    test,
    isoleucine,
    leucine,
    valine,
    fiber,
    sugar,
    calcium,
  ] = macros;
  const dvPercentCalc = (nutri, dv) => {
    return nutri === 0 ? 0 : ((nutri * 100) / dv).toFixed(1);
  };
  const energyPortionCal = (nutri) => {
    let i;
    if (nutri === fats) {
      i = 8.37;
    } else if (nutri === protein) {
      i = 3.36;
    } else {
      i = 3.6;
    }

    return ((i * nutri.value * 100) / energy.value).toFixed(1);
  };
  console.log("in nutri facts", protein);
  useEffect(() => {
    onSetHlMacro({
      pro: energyPortionCal(protein),
      carb: energyPortionCal(carbs),
      fat: energyPortionCal(fats),
    });
  }, [protein, carbs, fats]);

  return (
    <div style={{ transform: "scale(1)" }}>
      <section class="nutrition-label">
        <header class="nutrition-header border-b-lg">
          <h1 class="nutrition-facts border-b">Nutrition Facts for {name}</h1>

          <div class="nutrition-row">
            <div class="nutrition-column text-md text-bold">Serving size</div>
            <div class="nutrition-column text-md text-bold text-right">
              100g
            </div>
          </div>
        </header>
        <div class="nutrition-row border-b-md">
          <div class="nutrition-column text-bold">
            <div class="text-sm">Amount per serving</div>
            <div class="calories">Calories</div>
          </div>
          <div class="nutrition-column calories amount align-bottom text-right">
            {energy.value}
          </div>
        </div>
        <div class="nutrition-row border-b">
          <div class="nutrition-column text-right text-bold text-sm">
            % Daily Value *
          </div>
        </div>
        <div class="nutrition-row border-b">
          <div class="nutrition-column">
            <span class="text-bold">Water</span> {water.value}g
          </div>
          <div class="nutrition-column text-bold text-right"></div>
        </div>
        <div class="nutrition-row border-b">
          <div class="nutrition-column">
            <span class="text-bold">Total Fat</span> {fats.value}g
          </div>
          <div class="nutrition-column text-bold text-right">
            {dvPercentCalc(fats.value, 78)}%
          </div>
        </div>
        <div class="nutrition-row border-b">
          <div class="nutrition-column">
            <span class="text-indent">Saturated Fat {satFats.value}g</span>
          </div>
          <div class="nutrition-column text-bold text-right">
            {dvPercentCalc(satFats.value, 20)}%
          </div>
        </div>
        <div class="nutrition-row border-b">
          <div class="nutrition-column">
            <span class="text-indent">
              Unsaturated Fat {(polyFats.value + monoFats.value).toFixed(2)}g
            </span>
          </div>
          <div class="nutrition-column text-bold text-right">
            {dvPercentCalc(polyFats.value + monoFats.value, 50)}%
          </div>
        </div>
        <div class="nutrition-row border-b">
          <div class="nutrition-column">
            <span class="text-indent">
              <span class="text-indent">
                Monosaturated Fat {monoFats.value}g
              </span>
            </span>
          </div>
          <div class="nutrition-column text-bold text-right">
            {dvPercentCalc(monoFats.value, 33)}%
          </div>
        </div>
        <div class="nutrition-row border-b">
          <div class="nutrition-column">
            <span class="text-indent">
              <span class="text-indent">
                Polysaturated Fat {polyFats.value}g
              </span>
            </span>
          </div>
          <div class="nutrition-column text-bold text-right">
            {dvPercentCalc(polyFats.value, 16)}%
          </div>
        </div>
        <div class="nutrition-row border-b">
          <div class="nutrition-column">
            <span class="text-indent">
              <i>Trans</i> Fat {transFats.value}g
            </span>
          </div>
          <div class="nutrition-column text-bold text-right">
            {dvPercentCalc(transFats.value, 2)}%
          </div>
        </div>
        <div class="nutrition-row border-b">
          <div class="nutrition-column">
            <span class="text-bold">Cholesterol</span> {cholesterol.value}mg
          </div>
          <div class="nutrition-column text-bold text-right">
            {dvPercentCalc(cholesterol.value, 300)}%
          </div>
        </div>
        <div class="nutrition-row border-b">
          <div class="nutrition-column">
            <span class="text-bold">Sodium</span> {sodium.value}mg
          </div>
          <div class="nutrition-column text-bold text-right">
            {dvPercentCalc(sodium.value, 2300)}%
          </div>
        </div>
        <div class="nutrition-row border-b">
          <div class="nutrition-column">
            <span class="text-bold">Total Carbohydrate</span> {carbs.value}g
          </div>
          <div class="nutrition-column text-bold text-right">
            {dvPercentCalc(carbs.value, 300)}%
          </div>
        </div>
        <div class="nutrition-row border-b">
          <div class="nutrition-column">
            <span class="text-indent">Dietary Fiber {fiber.value}g</span>
          </div>
          <div class="nutrition-column text-bold text-right">
            {dvPercentCalc(fiber.value, 28)}%
          </div>
        </div>
        <div class="nutrition-row">
          <div class="nutrition-column">
            <span class="text-indent">Total Sugars {sugar.value}g</span>
          </div>
          <div class="nutrition-column text-bold text-right">
            {dvPercentCalc(sugar.value, 50)}%
          </div>
        </div>
        <div class="nutrition-row border-t-sm border-b-lg">
          <div class="nutrition-column">
            <span class="text-bold">Protein</span> {protein.value}g
          </div>
          <div class="nutrition-column text-bold text-right">
            {dvPercentCalc(protein.value, 50)}%
          </div>
        </div>
        <div class="nutrition-row border-b">
          <div class="nutrition-column">Vitamin A {vitaminA.value}iu</div>
          <div class="nutrition-column text-right">
            {dvPercentCalc(vitaminA.value, 900)}%
          </div>
        </div>
        <div class="nutrition-row border-b">
          <div class="nutrition-column">Vitamin C {vitaminC.value}mg</div>
          <div class="nutrition-column text-right">
            {dvPercentCalc(vitaminC.value, 90)}%
          </div>
        </div>
        <div class="nutrition-row border-b-md">
          <div class="nutrition-column">Vitamin D {vitaminD.value}iu</div>
          <div class="nutrition-column text-right">
            {dvPercentCalc(vitaminD.value, 20)}%
          </div>
        </div>
        <div class="nutrition-row border-b">
          <div class="nutrition-column">Calcium {calcium.value}mg</div>
          <div class="nutrition-column text-right">
            {dvPercentCalc(calcium.value, 1300)}%
          </div>
        </div>
        <div class="nutrition-row border-b">
          <div class="nutrition-column">Iron {iron.value}mg</div>
          <div class="nutrition-column text-right">
            {dvPercentCalc(iron.value, 18)}%
          </div>
        </div>
        <div class="nutrition-row border-b">
          <div class="nutrition-column">Magnesium {magnesium.value}mg</div>
          <div class="nutrition-column text-right">
            {dvPercentCalc(magnesium.value, 420)}%
          </div>
        </div>
        <div class="nutrition-row border-b">
          <div class="nutrition-column">Zinc {zinc.value}mg</div>
          <div class="nutrition-column text-right">
            {dvPercentCalc(zinc.value, 11)}%
          </div>
        </div>
        <div class="nutrition-row border-b">
          <div class="nutrition-column">Phosphorus {phosphorus.value}mg</div>
          <div class="nutrition-column text-right">
            {dvPercentCalc(phosphorus.value, 1250)}%
          </div>
        </div>
        <div class="nutrition-row border-b-md">
          <div class="nutrition-column">Potassium {potassium.value}mg</div>
          <div class="nutrition-column text-right">
            {dvPercentCalc(potassium.value, 4700)}%
          </div>
        </div>
        <div class="nutrition-row border-b">
          <div class="nutrition-column">Leucine {leucine.value}mg</div>
          <div class="nutrition-column text-right"></div>
        </div>
        <div class="nutrition-row border-b">
          <div class="nutrition-column">Isoleucine {isoleucine.value}mg</div>
          <div class="nutrition-column text-right"></div>
        </div>
        <div class="nutrition-row border-b">
          <div class="nutrition-column">Valine {valine.value}mg</div>
          <div class="nutrition-column text-right"></div>
        </div>
        <footer class="nutrition-footer">
          <div class="asteric">*</div>
          <div class="footnote">
            The % Daily Value (DV) tells you how much a nutrient in a serving of
            food contributes to a daily diet. 2,000 calories a day is used for
            general nutrition advice.
          </div>
        </footer>
      </section>
    </div>
  );
};
export default NutritionFactsTable;
