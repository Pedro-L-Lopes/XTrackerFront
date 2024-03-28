// Hooks
import { useEffect } from "react";

// Redux
import { useSelector } from "react-redux";
import { getSummary } from "../slices/habitSlice";
import { useAppDispatch } from "../hooks/useAppDispatch";

// Components
import Header from "../components/habits/Header";
import SummaryTable from "../components/habits/SummaryTable";

const Habits = () => {
  const dispatch = useAppDispatch();

  const { habits } = useSelector((state: any) => state.habit);

  useEffect(() => {
    dispatch(getSummary());
  }, [dispatch]);
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-full max-w-5xl px-6 flex flex-col gap-16">
        <Header />
        <SummaryTable summary={habits} />
      </div>
    </div>
  );
};

export default Habits;
