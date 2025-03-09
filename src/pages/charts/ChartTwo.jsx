import React, { useState } from "react";
import Chart from "react-apexcharts";

const ChartTwo = () => {
  const [openDropDown, setOpenDropDown] = useState(false);

  const toggleDropDown = () => {
    setOpenDropDown(!openDropDown);
  };

  const chartOptions = {
    chart: {
      type: "pie",
      height: 250, // Increased height for better visibility
    },
    series: [44, 55, 13, 43, 22],
    labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
    dataLabels: {
      enabled: false, // Disabling data labels inside the chart
    },
    legend: {
      position: "bottom", // Moving legend to the bottom
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 250,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <div className="col-span-12 xl:col-span-5">
      {/* Chart Two Start */}
      <div className="rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="shadow-default rounded-2xl bg-white px-5 pb-11 pt-5 dark:bg-gray-900 sm:px-6 sm:pt-6">
          <div className="flex justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                Monthly Target
              </h3>
              <p className="mt-1 text-theme-sm text-gray-500 dark:text-gray-400">
                Target you’ve set for each month
              </p>
            </div>
            
          </div>

          <div className="relative max-h-[195px]">
            <div id="chartTwo" className="h-full" style={{ minHeight: "250px" }}>
              <Chart
                options={chartOptions}
                series={chartOptions.series}
                type="pie"
                height={230}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-5 px-6 py-3.5 sm:gap-8 sm:py-5 ">
          <div>
            <p className="mb-1 text-center text-theme-xs text-gray-500 dark:text-gray-400 sm:text-sm">
              Target
            </p>
            <p className="text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
              $20K 🔴
            </p>
          </div>

          <div className="h-7 w-px bg-gray-200 dark:bg-gray-800"></div>

          <div>
            <p className="mb-1 text-center text-theme-xs text-gray-500 dark:text-gray-400 sm:text-sm">
              Revenue
            </p>
            <p className="text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
              $20K 🟢
            </p>
          </div>

          <div className="h-7 w-px bg-gray-200 dark:bg-gray-800"></div>

          <div>
            <p className="mb-1 text-center text-theme-xs text-gray-500 dark:text-gray-400 sm:text-sm">
              Today
            </p>
            <p className="text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
              $20K 🟢
            </p>
          </div>
        </div>
      </div>
      {/* Chart Two End */}
    </div>
  );
};

export default ChartTwo;
