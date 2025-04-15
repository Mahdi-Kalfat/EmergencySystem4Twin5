import React from "react";
import MetricGroupOne from "./charts/MetricGroupOne";
import ChartOne from "./charts/ChartOne";
import ChartTwo from "./charts/ChartTwo";
import Calendrier from "./charts/Calendrier";
// Importer le composant Calendrier

const Dashboard = () => {
  return (
    <main className="p-4 w-full dashboard-container">
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
        <div className="col-span-12 md:col-span-6">
          <ChartTwo />
        </div>

        {/* Section pour le calendrier */}
        <div className="col-span-12 mt-6">
          <h2 className="text-xl font-semibold mb-4">
            Planification des Rendez-vous
          </h2>
          <Calendrier /> {/* Intégrer le composant Calendrier ici */}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
