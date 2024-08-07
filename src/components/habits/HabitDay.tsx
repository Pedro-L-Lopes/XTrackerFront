// Css
import "../../styles/scrollBar.css";

// Hooks
import { useState } from "react";

// Components
import * as Popover from "@radix-ui/react-popover";
import ProgressBar from "../utils/progress/ProgressBar";
import HabitList from "./HabitList";

// Libs
import dayjs from "dayjs";
import clsx from "clsx";

// Icons
import { BsAppIndicator } from "react-icons/bs";

// Interface
import { HabitDayProps } from "../../interfaces/habits/HabitDayProps";

const HabitDay = ({
  defaultCompleted = 0,
  defaultAmount = 0,
  date,
}: HabitDayProps) => {
  const [completed, setCompleted] = useState(defaultCompleted);
  const [amount, setAmount] = useState(defaultAmount);

  const completedPercentage =
    amount > 0 ? Math.round((completed / amount) * 100) : 0;

  const dayAndMonth = dayjs(date).format("DD/MM/YYYY");
  const dayOfWeek = dayjs(date).format("dddd");
  const isToday = dayjs(date).isSame(dayjs(), "day");

  const classes = clsx(
    "w-10 h-10 border-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-background text-sm text-zinc-500 flex items-center justify-center",
    {
      "bg-zinc-900 border-zinc-800": completedPercentage === 0,
      "bg-teal-900 border-teal-500":
        completedPercentage > 0 && completedPercentage < 20,
      "bg-teal-800 border-teal-500":
        completedPercentage >= 20 && completedPercentage < 40,
      "bg-teal-700 border-teal-500":
        completedPercentage >= 40 && completedPercentage < 60,
      "bg-teal-600 border-teal-500":
        completedPercentage >= 60 && completedPercentage < 80,
      "bg-teal-500 border-teal-400":
        completedPercentage >= 80 && completedPercentage <= 100,
    }
  );

  async function handleCompletedChange(completed: number, amount: number) {
    setCompleted(completed);
    setAmount(amount);
  }

  return (
    <Popover.Root>
      <Popover.Trigger className={classes}>
        {isToday ? <BsAppIndicator className="fill-white" /> : ""}
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content className="min-w-[320px] max-h-[330px] p-6 rounded-2xl bg-zinc-900 flex flex-col overflow-y-auto custom-scrollbar ">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-zinc-400">{dayOfWeek}</span>
            <span className="font-semibold text-zinc-400">
              {completed}/{amount}
            </span>
          </div>

          <span className="mt-1 font-extrabold leading-tight text-3xl">
            {dayAndMonth}
          </span>

          <ProgressBar progress={completedPercentage} />

          <HabitList date={date} onCompletedChanged={handleCompletedChange} />

          <Popover.Arrow height={8} width={16} className="fill-zinc-900" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default HabitDay;
