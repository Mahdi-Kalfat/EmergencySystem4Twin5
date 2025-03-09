import React, { useState } from "react";
import Chart from "react-apexcharts";

const ChartOne = () => {
  const [openDropDown, setOpenDropDown] = useState(false);

  const toggleDropDown = () => {
    setOpenDropDown(!openDropDown);
  };

  const chartOptions = {
    chart: {
      type: "bar", // Changed from "line" to "bar"
      height: 300,
      toolbar: {
        show: false,
      },
    },
    series: [
      {
        name: "Sales",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
      },
    ],
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
    },
    plotOptions: {
      bar: {
        horizontal: false, // Set to true if you want horizontal bars
        columnWidth: "55%", // Adjust the width of the bars
        endingShape: "rounded", // Rounded edges for bars
      },
    },
    dataLabels: {
      enabled: false, // Disable data labels on bars
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"], // Transparent stroke for bars
    },
    fill: {
      opacity: 1, // Adjust the opacity of the bars
    },
    grid: {
      show: true,
      borderColor: "#EAEAEA",
    },
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Monthly Sales
        </h3>

        <div className="relative h-fit">
          <button
            onClick={toggleDropDown}
            className={`${
              openDropDown
                ? "text-gray-700 dark:text-white"
                : "text-gray-400 hover:text-gray-700 dark:hover:text-white"
            }`}
          >
            <svg
              className="fill-current"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.2441 6C10.2441 5.0335 11.0276 4.25 11.9941 4.25H12.0041C12.9706 4.25 13.7541 5.0335 13.7541 6C13.7541 6.9665 12.9706 7.75 12.0041 7.75H11.9941C11.0276 7.75 10.2441 6.9665 10.2441 6ZM10.2441 18C10.2441 17.0335 11.0276 16.25 11.9941 16.25H12.0041C12.9706 16.25 13.7541 17.0335 13.7541 18C13.7541 18.9665 12.9706 19.75 12.0041 19.75H11.9941C11.0276 19.75 10.2441 18.9665 10.2441 18ZM11.9941 10.25C11.0276 10.25 10.2441 11.0335 10.2441 12C10.2441 12.9665 11.0276 13.75 11.9941 13.75H12.0041C12.9706 13.75 13.7541 12.9665 13.7541 12C13.7541 11.0335 12.9706 10.25 12.0041 10.25H11.9941Z"
                fill=""
              ></path>
            </svg>
          </button>
          {openDropDown && (
            <div className="absolute right-0 z-40 w-40 p-2 space-y-1 bg-white border border-gray-200 top-full rounded-2xl shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark">
              <button className="flex w-full px-3 py-2 font-medium text-left text-gray-500 rounded-lg text-theme-xs hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
                View More
              </button>
              <button className="flex w-full px-3 py-2 font-medium text-left text-gray-500 rounded-lg text-theme-xs hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="-ml-5 min-w-[650px] pl-2 xl:min-w-full">
          <div
            id="chartOne"
            className="-ml-5 h-full min-w-[650px] pl-2 xl:min-w-full"
            style={{ minHeight: "300px" }}
          >
            <Chart
              options={chartOptions}
              series={chartOptions.series}
              type="bar" // Changed from "line" to "bar"
              height={300}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartOne;