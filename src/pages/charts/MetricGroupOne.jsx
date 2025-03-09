export default function MetricGroupOne() {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
        {[
          {
            title: "Customers",
            count: "3,782",
            change: "↑ 11.01%",
            changeColor: "text-green-600",
            bgColor: "bg-green-100",
            icon: (
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800">
                <svg
                  className="fill-gray-800 dark:fill-white/90"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8.80443 5.60156 ..." />
                </svg>
              </div>
            ),
          },
          {
            title: "Orders",
            count: "5,359",
            change: "↓ 9.05%",
            changeColor: "text-red-600",
            bgColor: "bg-red-100",
            icon: (
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800">
                <svg
                  className="fill-gray-800 dark:fill-white/90"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M11.665 3.75621 ..." />
                </svg>
              </div>
            ),
          },
        ].map((metric, index) => (
          <div
            key={index}
            className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]"
          >
            {metric.icon}
            <div className="mt-5">
              <span className="text-sm text-gray-500 dark:text-gray-400">{metric.title}</span>
              <h4 className="mt-1 text-2xl font-bold text-gray-800 dark:text-white/90">{metric.count}</h4>
            </div>
            <span
              className={`mt-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-sm font-medium ${metric.bgColor} ${metric.changeColor}`}
            >
              {metric.change}
            </span>
          </div>
        ))}
      </div>
    );
  }
  