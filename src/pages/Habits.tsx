// Hooks
import { useEffect, useState } from "react";

// Components
import Header from "../components/habits/Header";
import SummaryTable from "../components/habits/SummaryTable";
import HabitMetrics from "../components/habits/HabitsAndMetrics";

// Api
import { api } from "../lib/api";

const Habits = () => {
  // useEffect(() => {
  //   api.get("/summary").then((response) => {
  //     settSummary(response.data);
  //   });
  // }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full max-w-5xl px-6 flex flex-col gap-2">
        <Header />
        <SummaryTable />
        <HabitMetrics />
      </div>
      <footer className="text-lg mt-24">teste</footer>
    </div>
  );
};

export default Habits;
