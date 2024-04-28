// Css
import "../../styles/scrollBar.css";

// Hooks
import { useEffect } from "react";

// Images
import lessMore from "../../assets/lessMore.svg";

// Components
import HabitDay from "./HabitDay";

// Libs
import dayjs from "dayjs";
import { generateDatesFromYearBeginning } from "../../utils/generate-dates-from-year-beginning";

// Interfaces
import { Summary } from "../../interfaces/habits/ISummary";

// Utils
import { weekDays } from "../../utils/week-days";

// Redux
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useSelector } from "react-redux";
import { getSummary } from "../../slices/habitSlice";

const summaryDates = generateDatesFromYearBeginning();

const minimumSummaryDatesSize = 15 * 7;
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length;

type SummaryTableProps = {
  summary?: Summary;
};

const SummaryTable = () => {
  const dispatch = useAppDispatch();

  const { summary, loading } = useSelector((state: any) => state.habit);

  useEffect(() => {
    dispatch(getSummary());
  }, [dispatch]);

  if (loading) {
    return <p>Carregando... </p>;
  }

  return (
    <div className="overflow-x-scroll p-1 custom-scrollbar">
      <div className="w-full flex">
        <div className="grid grid-rows-7 grid-flow-row gap-3">
          {weekDays.map((weekDay, index) => (
            <div
              key={index}
              className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center"
            >
              {weekDay}
            </div>
          ))}
        </div>
        <div className="grid grid-rows-7 grid-flow-col gap-3">
          {summary &&
            summaryDates.map((date) => {
              const dayInSummary = summary.find((day: any) => {
                return dayjs(date).isSame(day.date, "day");
              });
              return (
                <HabitDay
                  key={date.toString()}
                  date={date}
                  defaultAmount={dayInSummary?.amount}
                  defaultCompleted={dayInSummary?.completed}
                />
              );
            })}
          {amountOfDaysToFill > 0 &&
            Array.from({ length: amountOfDaysToFill }).map((_, i) => {
              return (
                <div
                  key={i}
                  className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"
                />
              );
            })}
        </div>
      </div>
      <div className="flex justify-end">
        <img src={lessMore} className="mt-2" />
      </div>
    </div>
  );
};

export default SummaryTable;
