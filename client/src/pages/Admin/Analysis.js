import React from "react";
import Chart from "react-apexcharts";

const Analysis = () => {
  const chartData = {
    options: {
      chart: {
        id: "month-wise-payments",
      },
      xaxis: {
        categories: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
      },
      yaxis: {
        title: {
          text: "Payments (in Rupees)",
        },
      },
      title: {
        text: "Month-wise Payments",
        align: "center",
      },
      theme: {
        mode: "light", // you can change this to 'dark'
        palette: "palette1", // up to palette10
        monochrome: {
          enabled: true,
          color: "#255aee",
          shadeTo: "light",
          shadeIntensity: 0.65,
        },
      },
    },
    series: [
      {
        name: "Payments",
        data: [
          4000, 3000, 3500, 5000, 2000, 4500, 4000, 3700, 4100, 3800, 4200,
          4500,
        ],
      },
    ],
  };
  const CategoryData = {
    options: {
      labels: ["Cupboard", "Table", "Chair", "Sofa"],
      title: {
        text: "Category-wise Percentage",
        align: "center",
      },
      legend: {
        position: "bottom",
      },
    },
    series: [30, 25, 15, 20], // Example data, replace with your actual data
  };
  const LoactionData = {
    options: {
      chart: {
        id: "location-wise-sales",
      },
      xaxis: {
        categories: [
          "Ahemdabad",
          "Rajkot",
          "Jamnagar",
          "Surat",
          "Mehasana",
          "Morbi",
        ],
        title: {
          text: "Locations",
        },
      },
      yaxis: {
        title: {
          text: "Sales (in Ruppes)",
        },
      },
      title: {
        text: "Location-wise Sales Data",
        align: "center",
      },
      theme: {
        mode: "light", // you can change this to 'dark'
        palette: "palette1", // up to palette10
        monochrome: {
          enabled: true,
          color: "#255aee",
          shadeTo: "light",
          shadeIntensity: 0.65,
        },
      },
    },
    series: [
      {
        name: "Sales",
        data: [4000, 3000, 3500, 5000, 2000, 4500],
      },
    ],
  };
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={300}
      />

      <Chart
        options={CategoryData.options}
        series={CategoryData.series}
        type="pie"
        height={300}
      />
      <div className="mt-5"></div>
      <Chart
        options={LoactionData.options}
        series={LoactionData.series}
        type="bar"
        height={300}
      />
    </div>
  );
};

export default Analysis;
