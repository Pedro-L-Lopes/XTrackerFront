// Css
import "../../styles/scrollBar.css";

// Hooks
import { useState } from "react";

// Components
import * as Popover from "@radix-ui/react-popover";
import ProgressBar from "./ProgressBar";
import HabitList from "./HabitList";

// Libs
import dayjs from "dayjs";
import clsx from "clsx";

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

  const dayAndMonth = dayjs(date).format("DD/MM");
  const dayOfWeek = dayjs(date).format("dddd");

  const classes = clsx(
    "w-10 h-10 border-2 border-zinc-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-background",
    {
      "bg-zinc-900 border-zinc-800": completedPercentage === 0,
      "bg-violet-900 border-violet-500":
        completedPercentage > 0 && completedPercentage < 20,
      "bg-violet-800 border-violet-500":
        completedPercentage >= 20 && completedPercentage < 40,
      "bg-violet-700 border-violet-500":
        completedPercentage >= 40 && completedPercentage < 60,
      "bg-violet-600 border-violet-500":
        completedPercentage >= 60 && completedPercentage < 80,
      "bg-violet-500 border-violet-400":
        completedPercentage >= 80 && completedPercentage <= 100,
    }
  );

  async function handleCompletedChange(completed: number, amount: number) {
    setCompleted(completed);
    setAmount(amount);
  }

  return (
    <Popover.Root>
      <Popover.Trigger className={classes} />

      <Popover.Portal>
        <Popover.Content className="min-w-[320px] max-h-[330px] p-6 rounded-2xl bg-zinc-900 flex flex-col overflow-y-auto custom-scrollbar">
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
