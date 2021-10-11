import { Pie } from "react-chartjs-2";

import React from "react";

const EnergyPieChart = ({ proteinPie, carbPie, fatPie }) => {
  const data = {
    labels: ["Protein", "Carbohydrates", "Fats"],
    datasets: [
      {
        data: [proteinPie, carbPie, fatPie],
        backgroundColor: [
          "rgba(255, 0, 0, 0.8)",
          "rgba(0, 0, 255, 0.8)",
          "rgba(255, 153, 0, 0.8)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItems, data) {
            let label =
              tooltipItems.label + ": " + " " + tooltipItems.raw + "%";

            return label;
          },
        },
      },
    },
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "35%" }}>
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default EnergyPieChart;
