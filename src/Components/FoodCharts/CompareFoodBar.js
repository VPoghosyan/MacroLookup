import React, { useState, useContext } from "react";
import { Bar, defaults } from "react-chartjs-2";
import * as scale from "d3-scale";

import Flip from "react-reveal/Flip";
import { FoodListContext } from "../../Context/foodList-context";
import "./CombinedFoodPie.css";

const CompareFoodBar = ({ barArr }) => {
  const length = barArr.value.length;
  const [isVisibleCpF, setIsVisibleCpF] = useState(false);
  const cpFCtx = useContext(FoodListContext);

  const colors = scale
    .scaleLinear()
    .domain([0, length])
    .range(["rgba(102, 255, 255, 0.8)", "rgb(204, 0, 153, 0.8)"]);

  const data = {
    labels: cpFCtx.sflarr.map((n) =>
      n.name.length > 40 ? n.name.slice(0, 35) : n.name
    ),
    datasets: [
      {
        label: barArr.name,
        data: barArr.value,
        backgroundColor: barArr.value.map((n, i) => colors(i)),
        borderColor: barArr.value.map((n, i) => colors(i)),

        borderWidth: 1,
      },
    ],
  };
  const options = {
    indexAxis: "y",
    plugins: {
      title: {
        display: true,
        text: barArr.name,
      },
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItems, data) {
            //console.log(tooltipItems);
            let label = tooltipItems.raw + barArr.units;

            return label;
          },
          title: function (tooltipItems, data) {
            return "";
          },
        },
      },
    },
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "35%" }}>
        <Flip
          left
          duration={2000}
          when={isVisibleCpF}
          innerRef={(ref) => {
            let rootMargin = "-30px";
            const observer = new IntersectionObserver(
              ([entry]) => {
                setIsVisibleCpF(entry.isIntersecting);
              },
              { rootMargin }
            );

            ref && observer.observe(ref);
          }}
        >
          <div style={{ margin: "15px" }}>
            <div className="miniCard">
              <Bar data={data} options={options} />
            </div>
          </div>
        </Flip>
      </div>
    </div>
  );
};

export default CompareFoodBar;
