import React from "react";
import MetricGroupOne from "./charts/MetricGroupOne";
import ChartOne from "./charts/ChartOne";
import ChartTwo from "./charts/ChartTwo";

const Dashboard = () => {
  return (
    <main className="p-4 w-full">
      <div className="grid grid-cols-12 gap-6 w-full">
        {/* MetricGroupOne (Two Cards) on the left */}
        <div className="col-span-12 md:col-span-6">
          <MetricGroupOne />
          {/* ChartOne below MetricGroupOne */}
          <div className="mt-6">
            <ChartOne />
          </div>
        </div>

        {/* ChartTwo on the right */}
        <div className="col-span-12 md:col-span-6 ">
          <ChartTwo />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
