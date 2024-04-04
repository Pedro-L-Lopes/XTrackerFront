// Hooks
import { useEffect, useState } from "react";

// Components
import * as Checkbox from "@radix-ui/react-checkbox";

// Icons
import { FaCheck } from "react-icons/fa6";

// Libs
import dayjs from "dayjs";

// Interfaces
import { HabitsInfo } from "../../interfaces/habits/IHabitsInfo";

// Api
import { api } from "../../lib/api";

interface HabitListProps {
  date: Date;
  onCompletedChanged: (completed: number, amount: number) => void;
}

const HabitList = ({ date, onCompletedChanged }: HabitListProps) => {
  const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>();

  console.log(habitsInfo);

  const formattedDate = dayjs(date).format("YYYY-MM-DD");

  useEffect(() => {
    api
      .get("/day", {
        params: {
          date: date.toISOString(),
        },
      })
      .then((response) => {
        setHabitsInfo(response.data);
        onCompletedChanged(
          response.data.completedHabits.length,
          response.data.possibleHabits.length
        );
      });
  }, []);

  async function handleToggleHabit(habitId: string) {
    const isHabitAlreadyCompleted =
      habitsInfo!.completedHabits.includes(habitId);

    await api.patch(`/${habitId}/toggle?date=${formattedDate}`);

    let completedHabits: string[] = [];

    if (isHabitAlreadyCompleted) {
      completedHabits = habitsInfo!.completedHabits.filter(
        (id) => id !== habitId
      );
    } else {
      completedHabits = [...habitsInfo!.completedHabits, habitId];
    }

    setHabitsInfo({
      possibleHabits: habitsInfo!.possibleHabits,
      completedHabits,
    });

    onCompletedChanged(
      completedHabits.length,
      habitsInfo!.possibleHabits.length
    );
  }

  return (
    <div className="mt-6 flex flex-col gap-3">
      {habitsInfo?.possibleHabits.map((habit) => (
        <Checkbox.Root
          key={habit.id}
          onCheckedChange={() => handleToggleHabit(habit.id)}
          checked={habitsInfo.completedHabits.includes(habit.id)}
          className="flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed"
        >
          <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-50 transition-colors group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-background">
            <Checkbox.Indicator>
              <FaCheck size={20} className="text-white" />
            </Checkbox.Indicator>
          </div>
          <span
            className={`font-semibold text-xl text-white leading-tight truncate max-w-[220px]  ${
              habitsInfo.completedHabits.includes(habit.id)
                ? "line-through text-zinc-400"
                : ""
            }`}
          >
            {habit.title}
          </span>
        </Checkbox.Root>
      ))}
    </div>
  );
};

export default HabitList;
