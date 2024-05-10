// Css
import "../../styles/scrollBar.css";

// Hooks
import { useState, useEffect } from "react";

// Images
import lessMore from "../../assets/lessMore.svg";

// Components
import HabitDay from "./HabitDay";

// Libs
import dayjs from "dayjs";
import { generateDatesFromYearBeginning } from "../../utils/generate-dates-from-year-beginning";

// Utils
import { weekDays } from "../../utils/week-days";

// Redux
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useSelector } from "react-redux";
import { getSummary } from "../../slices/habitSlice";

const currentYear = new Date().getFullYear();

const SummaryTable = () => {
  const [selectedYear, setSelectedYear] = useState(currentYear.toString());

  const summaryDates = generateDatesFromYearBeginning(selectedYear).map(
    (dateString) => new Date(dateString)
  );

  const minimumSummaryDatesSize = 15 * 7;
  const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length;

  const dispatch = useAppDispatch();

  const { summary, loading } = useSelector((state: any) => state.habit);

  useEffect(() => {
    dispatch(getSummary(selectedYear));
  }, [dispatch, selectedYear]);

  console.log(summary);

  if (loading) {
    return <p>Carregando... </p>;
  }

  return (
    <main>
      <section className="overflow-x-scroll p-1 custom-scrollbar">
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
      </section>
      <div className="flex items-center justify-between mt-2">
        <select
          className="appearance-none bg-transparent border border-violet-500 rounded-md py-2 px-4 text-violet-500 leading-tight focus:outline-none focus:border-violet-700 cursor-pointer font-bold"
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option
            className="font-bold"
            value={currentYear.toString()}
            selected={selectedYear === currentYear.toString()}
          >
            {currentYear.toString()}
          </option>
          <option
            className="font-bold"
            value="2023"
            selected={selectedYear === "2023"}
          >
            2023
          </option>
          <option
            className="font-bold"
            value="2022"
            selected={selectedYear === "2022"}
          >
            2022
          </option>
        </select>

        <img src={lessMore} className="mt-2" />
      </div>
    </main>
  );
};

export default SummaryTable;
