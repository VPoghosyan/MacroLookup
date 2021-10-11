import React, { useState, useRef } from "react";
import { Pie } from "react-chartjs-2";
import * as scale from "d3-scale";

import Flip from "react-reveal/Flip";
import "./CombinedFoodPie.css";

const CombinedFoodPie = ({ pieArr }) => {
  const length = pieArr.name.length;
  const [isVisibleCF, setIsVisibleCF] = useState(false);

  const colors = scale
    .scaleLinear()
    .domain([0, length])
    .range(["rgba(0, 102, 153, 0.8)", "rgb(204, 0, 0, 0.8)"]);

  const data = {
    labels: pieArr.name.map((n) => (n.length > 40 ? n.slice(0, 35) : n)),
    datasets: [
      {
        data: pieArr.value,
        backgroundColor: pieArr.name.map((n, i) => colors(i)),
        borderColor: pieArr.name.map((n, i) => colors(i)),

        borderWidth: 1,
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        display: true,

        labels: {
          fillStyle: "rgb(255, 99, 255)",
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItems, data) {
            let label =
              tooltipItems.label + ": " + " " + tooltipItems.raw + pieArr.units;

            return label;
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
          when={isVisibleCF}
          innerRef={(ref) => {
            let rootMargin = "-30px";
            const observer = new IntersectionObserver(
              ([entry]) => {
                setIsVisibleCF(entry.isIntersecting);
              },
              { rootMargin }
            );

            ref && observer.observe(ref);
          }}
        >
          <div style={{ margin: "15px" }}>
            {pieArr.title ? (
              <div className="miniCard">
                {pieArr.title.map((i) => (
                  <p>{i}</p>
                ))}
              </div>
            ) : null}
            <Pie data={data} options={options} />
          </div>
        </Flip>
      </div>
    </div>
  );
};

export default CombinedFoodPie;
