import React from "react";
import Chart from "react-apexcharts";

const Analysis = () => {
  const chartData = {
    options: {
      xaxis: {
        categories: [
          "New York",
          "Los Angeles",
          "Chicago",
          "Houston",
          "Phoenix",
          "Philadelphia",
        ],
      },
    },
    series: [
      {
        name: "Payments",
        data: [4000, 3000, 3500, 5000, 2000, 4500],
      },
    ],
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-bold mb-4">Location-wise Payments</h2>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={300}
      />
    </div>
  );
};

export default Analysis;
