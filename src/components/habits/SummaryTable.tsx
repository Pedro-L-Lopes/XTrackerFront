// Css
import "../../styles/scrollBar.css";

// Hooks
import { useState, useEffect } from "react";

// Images
import lessMore from "../../assets/lessMore.svg";

// Components
import HabitDay from "./HabitDay";
import Loading from "../utils/loading/Loading";

// Libs
import dayjs from "dayjs";
import { generateYearForUser } from "../../utils/generate-year-for-user";
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
  const [years, setYears] = useState<number[]>();

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

  useEffect(() => {
    setYears(generateYearForUser().reverse());
  }, []);

  useEffect(() => {
    const container = document.querySelector(".custom-scrollbar");
    if (container) {
      container.scrollLeft = container.scrollWidth - container.clientWidth;
    }
  }, [summary]);

  if (loading) {
    return <Loading />;
  }

  return (
    <main>
      <section className="">
        <div className="w-full flex">
          <div className="grid grid-rows-7 grid-flow-row gap-3 mb-4">
            {weekDays.map((weekDay, index) => (
              <div
                key={index}
                className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center"
              >
                {weekDay}
              </div>
            ))}
          </div>
          <div className="grid grid-rows-7 grid-flow-col gap-3 overflow-x-scroll p-1 custom-scrollbar">
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
          {years &&
            years.map((year) => (
              <option
                key={year}
                className="font-bold"
                value={year.toString()}
                selected={selectedYear === year.toString()}
              >
                {year}
              </option>
            ))}
        </select>

        <img src={lessMore} className="mt-2" />
      </div>
    </main>
  );
};

export default SummaryTable;
