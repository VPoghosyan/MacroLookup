import React, { useState } from "react";
import classes from "./FoodItems.module.css";
import ImageSearch from "../FoodImages/ImageSearch";

const FoodItems = ({ foodData, k }) => {
  const nutriMacIDs = [
    1008, 1004, 1005, 1003, 1051, 1089, 1090, 1091, 1092, 1093, 1095, 1104,
    1109, 1110, 1162, 1253, 1258, 1292, 1293, 1257, 7777, 1212, 1213, 1219,
    1079, 2000, 1087,
  ];

  const [itemClicked, setItemClicked] = useState(false);
  let final;
  const l = `/individualFood/${foodData.fdcId}`;
  const tar = k.replace(/([,.])/g, ""); //target input
  const tarSplit = tar.trim().split(" "); //split target input string into individual words
  let foodBrandName = foodData.brandName || foodData.brandOwner;

  let strSplit =
    foodData.description + (foodBrandName ? " by " + foodBrandName : "");
  strSplit = strSplit.toLowerCase();

  for (const j of tarSplit) {
    let regex = new RegExp(j, "gim");

    let temp = strSplit.replace(regex, `!!0${tarSplit.indexOf(j) + 1}~!!0`);
    strSplit = temp;
  }

  final = strSplit
    .split("!!0")
    .map((item) =>
      item[1] === "~" ? (
        <b>{tarSplit[Number(item.replace("~", "")) - 1]}</b>
      ) : (
        item
      )
    );

  const nutriFilter = (j, k) => {
    return foodNutrients.includes(j)
      ? foodData.foodNutrients[foodNutrients.indexOf(j)][k]
      : k === "unitName"
      ? "g"
      : 0;
  };

  const foodNutrients = foodData.foodNutrients.map((i) => i.nutrientId);
  const foodNutrientsArr = nutriMacIDs.map((i) => {
    return {
      id: i,
      ...["value", "unitName", "nutrientName"].reduce(
        (acc, curr) => ((acc[curr] = nutriFilter(i, curr)), acc),
        {}
      ),

      // value: nutriFilter(i, "value"),
      // units: nutriFilter(i, "unitName"),
      // nutriName: nutriFilter(i, "nutrientName"),
    };
  });

  return (
    <li
      className={classes.resList}
      onClick={() => {
        setItemClicked(true);
      }}
      style={{ fontFamily: "Montserrat" }}
      key={foodData.fdcId}
    >
      <span className={classes.sp}>
        <span>{final}</span>{" "}
        {itemClicked ? (
          <ImageSearch
            foodCategory={foodData.foodCategory}
            input={tar}
            itemDescription={foodData.description}
            foodId={foodData.fdcId}
            foodMacros={foodNutrientsArr}
            onSetItemClicked={setItemClicked}
            onItemClicked={itemClicked}
          />
        ) : (
          <span>{"  "}</span>
        )}
      </span>
      <hr className={classes} />
    </li>
  );
};

export default FoodItems;
