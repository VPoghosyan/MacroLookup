import React, { useContext, useState } from "react";
import { FoodListContext } from "../../../Context/foodList-context";
import CompareFoodBar from "../../FoodCharts/CompareFoodBar";

const CompareFoods = () => {
  const cPfCtx = useContext(FoodListContext);
  const compareDiet = cPfCtx.sflarr.map((f) => f.macros);
  const sepMacroArr = compareDiet[0].map((i, j) =>
    compareDiet.map((k) => {
      return {
        value: k[j].value,
        unit: k[j].unitName,
        name: k[j].nutrientName,
        id: k[j].id,
      };
    })
  );

  const sepMacroArrT = sepMacroArr
    .map((i) => {
      const validNameArr = i.filter((j) => j.name);
      return validNameArr.length
        ? {
            name: validNameArr[0].name,
            value: i.map((v) => v.value),
            unit: validNameArr[0].unit,
          }
        : null;
    })
    .filter((f) => f);
  console.log(sepMacroArrT);
  //////////////
  const protOCal0 = sepMacroArrT
    .filter((s) => ["Energy", "Protein"].includes(s.name))
    .map((i) => i.value);
  console.log(protOCal0);
  const testArr = [];
  for (let i = 0; i < protOCal0[0].length; i++) {
    console.log(protOCal0.length);
    testArr.push(
      protOCal0[1][i] ? (protOCal0[0][i] / protOCal0[1][i]).toFixed(2) : 0
    );
  }
  console.log(testArr);

  /////////////////
  return (
    <div style={{ textAlign: "center" }}>
      {sepMacroArrT.map((m) => {
        return (
          <CompareFoodBar
            barArr={{
              name: m.name,
              value: m.value,
              units: m.unit.toLowerCase().replace("kcal", "cal"),
            }}
          />
        );
      })}
      <CompareFoodBar
        barArr={{
          name: "Calories per 1g of Protein",
          value: testArr,
          units: "cal/g",
        }}
      />
    </div>
  );
};

export default CompareFoods;
