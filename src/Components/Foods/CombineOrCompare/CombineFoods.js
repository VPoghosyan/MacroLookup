import React, { useContext } from "react";
import { FoodListContext } from "../../../Context/foodList-context";
import EnergyPieChart from "../../FoodCharts/EnergyPieChart";
import CombinedFoodPie from "../../FoodCharts/CombinedFoodPie";

const CombineFoods = () => {
  const cfCtx = useContext(FoodListContext);
  const combinedDiet = cfCtx.sflarr
    .map((f) => f.macros.map((m) => m.value))
    .reduce((a, b) => a.map((v, i) => v + b[i]))
    .map((f) => f.toFixed(2).replace(/.00/g, ""));
  console.log(combinedDiet);

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
  ] = combinedDiet;
  console.log(protein);

  const energyPortionCal = (nutri) => {
    let i;
    if (nutri === fats) {
      i = 8.37;
    } else if (nutri === protein) {
      i = 3.36;
    } else {
      i = 3.6;
    }

    return ((i * nutri * 100) / energy).toFixed(1);
  };
  const combineFoodsPieArr = [
    {
      name: cfCtx.sflarr.map((n) => n.name),
      value: cfCtx.sflarr
        .map((n) => n.macros.filter((e) => e.id === 1008))
        .map((a) => a[0].value),
      units: "cal",
      title: [
        `Your combined foods contain ${energy} calories`,
        "Caloric contribution of selected foods (each food portion is 100g)",
      ],
    },
    {
      name: ["Protein", "Carbohydrates", "Fats"],
      value: [
        energyPortionCal(protein),
        energyPortionCal(carbs),
        energyPortionCal(fats),
      ],
      units: "%",

      title: ["Combined calorie distribution per macros (expressed in %)"],
    },
    {
      name: ["Vitamin C", "Vitamin E"],
      value: [vitaminC, vitaminE],
      units: "mg",

      title: ["Vitamin distribution"],
    },
    {
      name: ["Vitamin A", "Vitamin D"],
      value: [vitaminA, vitaminD],
      units: "ui",
    },

    {
      name: [
        "Monosaturated Fat",
        "Polysaturated Fat",
        "Trans Fat",
        "Saturated Fat",
      ],
      value: [monoFats, polyFats, transFats, satFats],
      units: "g",

      title: ["Fat distribution"],
    },
    {
      name: ["Sugar", "Fiber"],
      value: [sugar, fiber],
      units: "g",

      title: ["Carbohydrate distribution"],
    },
    {
      name: ["Leucine", "Isoleucine", "Valine"],
      value: [leucine, isoleucine, valine],
      units: "g",

      title: ["Branched-Chain Amino Acids (BCAA in g)"],
    },
    {
      name: [
        "Zinc",
        "Cholesterol",
        "Calcium",
        "Sodium",
        "Potassium",
        "Phosphorus",
        "Magnesium",
        "Iron",
      ],
      value: [
        zinc,
        cholesterol,
        calcium,
        sodium,
        potassium,
        phosphorus,
        magnesium,
        iron,
      ],
      units: "mg",

      title: ["Other Macros (mg)"],
    },
  ];
  return (
    <div style={{ textAlign: "center" }}>
      {combineFoodsPieArr.map((c) => (
        <CombinedFoodPie pieArr={c} />
      ))}
    </div>
  );
};

export default CombineFoods;
