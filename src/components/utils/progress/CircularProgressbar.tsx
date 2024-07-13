// Hooks
import { useState, useEffect } from "react";

// Interfaces
import { IHMetricsPorgress } from "../../../interfaces/habits/IHMetrics";

const CircularProgressbar = ({ completed, available }: IHMetricsPorgress) => {
  const circumference = 2 * (22 / 7) * 120;
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const currentPercentage =
      (parseInt(completed || "0") / parseInt(available || "100")) * 100;
    setPercentage(currentPercentage);
  }, [completed, available]);

  return (
    <main className="w-full flex items-center justify-center">
      <section className="">
        <div className="flex items-center justify-center">
          <svg className="transform -rotate-90 w-72 h-72">
            <circle
              cx="145"
              cy="145"
              r="120"
              stroke="currentColor"
              strokeWidth="30"
              fill="transparent"
              className="text-gray-700"
            />
            <circle
              cx="145"
              cy="145"
              r="120"
              stroke="currentColor"
              strokeWidth="30"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={
                circumference - (percentage / 100) * circumference
              }
              className="text-teal-600"
              style={{ transition: "stroke-dashoffset 0.5s ease-in-out" }}
            />
          </svg>
          <span className="absolute text-5xl font-bold">{`${percentage.toFixed(
            2
          )}%`}</span>
        </div>
      </section>
    </main>
  );
};

export default CircularProgressbar;
