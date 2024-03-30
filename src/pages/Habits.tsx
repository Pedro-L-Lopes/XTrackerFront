// Hooks
import { useEffect, useState } from "react";

// Components
import Header from "../components/habits/Header";
import SummaryTable from "../components/habits/SummaryTable";

// Api
import { api } from "../lib/api";

// Interfaces
import { Summary } from "../interfaces/habits/ISummary";

const Habits = () => {
  const [summary, setSummary] = useState<Summary>([]);

  useEffect(() => {
    api.get("/summary").then((response) => {
      setSummary(response.data);
    });
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-full max-w-5xl px-6 flex flex-col gap-16">
        <Header />
        <SummaryTable summary={summary} />
      </div>
    </div>
  );
};

export default Habits;
