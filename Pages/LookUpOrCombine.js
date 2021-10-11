import React, { useContext, useRef, useState } from "react";
import NutritionFactsTable from "../Components/Foods/NutritionFactsTable";
import { FoodListContext } from "../Context/foodList-context";
import Zoom from "react-reveal/Zoom";
import EnergyPieChart from "../Components/FoodCharts/EnergyPieChart";
import CombineFoods from "../Components/Foods/CombineOrCompare/CombineFoods";

const IndividualFood = () => {
  const indiFoodsCtx = useContext(FoodListContext);
  const [isVisible, setIsVisible] = useState(false);
  const [restrict, setRestrict] = useState(0);
  const zoomEnergyPie = useRef();
  const [hlMacro, setHlMacro] = useState({
    pro: 0,
    carb: 0,
    fat: 0,
  });
  console.log(hlMacro);
  console.log(isVisible);

  console.log(restrict);

  return (
    <div style={{ minHeight: "35rem", width: "100%", position: "absolute" }}>
      {indiFoodsCtx.sflarr.length === 1 ? (
        <div>
          <NutritionFactsTable onSetHlMacro={setHlMacro} />{" "}
          <Zoom
            duration={2000}
            when={restrict}
            innerRef={(ref) => {
              let rootMargin = "-50px";

              const observer = new IntersectionObserver(
                ([entry]) => {
                  if (restrict < 8) {
                    setIsVisible(entry.isIntersecting);
                  }
                  setRestrict((prev) => prev + 1);
                },
                { rootMargin }
              );

              ref && observer.observe(ref);
            }}
          >
            <div style={{ display: "flex", justifyContent: "center" }}>
              <p ref={zoomEnergyPie}>
                Calorie distribution per macros (expressed in %)
              </p>
            </div>

            <EnergyPieChart
              proteinPie={hlMacro.pro}
              carbPie={hlMacro.carb}
              fatPie={hlMacro.fat}
            />
          </Zoom>
        </div>
      ) : indiFoodsCtx.sflarr.length > 1 ? (
        <CombineFoods />
      ) : null}
    </div>
  );
};

export default IndividualFood;
