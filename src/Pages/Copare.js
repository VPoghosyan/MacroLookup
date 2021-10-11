import React, { useContext } from "react";
import CompareFoods from "../Components/Foods/CombineOrCompare/CompareFoods";
import { FoodListContext } from "../Context/foodList-context";

const Compare = () => {
  const compareCtx = useContext(FoodListContext);
  return (
    <div style={{ minHeight: "35rem", width: "100%", position: "absolute" }}>
      {compareCtx.sflarr.length > 1 ? <CompareFoods /> : null}
    </div>
  );
};

export default Compare;
