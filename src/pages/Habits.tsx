// Hooks
import { useEffect, useState } from "react";

// Components
import Sidebar from "../components/Sidebar";
import Header from "../components/habits/Header";
import SummaryTable from "../components/habits/SummaryTable";

// Api
import { api } from "../lib/api";

// Interfaces
import { Summary } from "../interfaces/habits/ISummary";
import HabitMetrics from "../components/habits/HabitsAndMetrics";

const Habits = () => {
  const [summary, setSummary] = useState<Summary>([]);

  useEffect(() => {
    api.get("/summary").then((response) => {
      setSummary(response.data);
    });
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full max-w-5xl px-6 flex flex-col gap-2">
        <Header />
        <SummaryTable summary={summary} />
        <HabitMetrics />
      </div>
      <footer className="text-lg mt-24">teste</footer>
    </div>
  );
};

export default Habits;
