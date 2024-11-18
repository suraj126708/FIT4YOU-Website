import React, { useState, useEffect } from "react";

const CoreValues = () => {
  const [gymStats, setGymStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the statistics from the API
    const fetchStats = async () => {
      try {
        const response = await fetch("http://localhost:8080/statistics");
        if (!response.ok) {
          throw new Error("Failed to fetch statistics");
        }
        const data = await response.json();
        if (data.success) {
          const stats = [
            {
              title: "Total Users",
              value: data["0"]["Total Users"],
              bgColor: "bg-blue-200",
              borderColor: "border-blue-500",
            },
            {
              title: "Total Exercises",
              value: data["0"]["Total Exercises"],
              bgColor: "bg-green-200",
              borderColor: "border-green-500",
            },
            {
              title: "Average Workout Time",
              value: `${data["0"]["Average Workout Time"]} mins`,
              bgColor: "bg-yellow-200",
              borderColor: "border-yellow-500",
            },
            {
              title: "New Members This Month",
              value: data["0"]["New Members This Month"],
              bgColor: "bg-red-200",
              borderColor: "border-red-500",
            },
          ];
          setGymStats(stats);
        } else {
          throw new Error("Invalid response from the server");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen  text-white">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center w-full h-screen  text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between w-full h-auto  mt-12 pl-4 pr-4">
      <h3 className="mb-8 mt-8 lg:mb-10 font-bold text-white text-center text-3xl sm:text-4xl md:text-5xl">
        Gym Statistics
      </h3>
      <div className="w-full flex-grow">
        <div className="flex flex-wrap justify-center sm:justify-between gap-6 sm:gap-8 lg:gap-10">
          {gymStats.map((stat, index) => (
            <div key={index} className="w-full sm:w-1/2 lg:w-1/4 xl:w-1/5 mb-6">
              <div className="relative h-full">
                <span
                  className={`absolute top-0 left-0 w-full h-full mt-1 ml-1 ${stat.bgColor} rounded-lg`}
                ></span>
                <div
                  className={`relative h-full p-5 bg-white border-2 ${stat.borderColor} rounded-lg`}
                >
                  <div className="flex-col items-center align-middle justify-center -mt-1">
                    <h3 className="my-3 text-lg sm:text-xl font-semibold text-gray-800 text-center">
                      {stat.title}
                    </h3>
                  </div>
                  <p className="font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-600 text-center">
                    {`${stat.value}+`}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoreValues;
