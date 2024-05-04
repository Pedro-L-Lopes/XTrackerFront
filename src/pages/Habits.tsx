import { useEffect } from "react";
import Header from "../components/habits/Header";
import SummaryTable from "../components/habits/SummaryTable";
import HabitMetrics from "../components/habits/HabitsAndMetrics";
import { useAuth } from "../hooks/useAuth";

const Habits = () => {
  const { user } = useAuth();

  useEffect(() => {
    const reload = localStorage.getItem("reload");
    if (!reload || reload === "false") {
      localStorage.setItem("reload", "true");
      window.location.reload();
    }
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full max-w-5xl px-6 flex flex-col gap-2">
        {user.userId != undefined ? (
          <>
            <Header />
            <SummaryTable />
            <HabitMetrics />
          </>
        ) : (
          <p>Carregando</p>
        )}
      </div>
    </div>
  );
};

export default Habits;
