import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getHabitDay } from "../../slices/habitSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import * as Checkbox from "@radix-ui/react-checkbox";
import { FaCheck } from "react-icons/fa6";
import dayjs from "dayjs";
import { HabitsInfo } from "../../interfaces/habits/IHabitsInfo";

interface HabitListProps {
  date: Date;
  onCompletedChanged: (completed: number) => void;
}

const HabitList = ({ date, onCompletedChanged }: HabitListProps) => {
  const dispatch = useAppDispatch();
  const { habitsDay, loading } = useSelector((state: any) => state.habit);
  const [habitsInfo, setHabitsInfo] = useState<HabitsInfo | null>(null);

  const formattedDate = dayjs(date).format("YYYY-MM-DD");

  useEffect(() => {
    dispatch(getHabitDay(formattedDate));
  }, [dispatch, formattedDate]);

  useEffect(() => {
    if (!loading && habitsDay) {
      setHabitsInfo(habitsDay);
    }
  }, [loading, habitsDay]);

  if (loading || !habitsInfo) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="mt-6 flex flex-col gap-3">
      {habitsInfo?.possibleHabits.map((habit) => (
        <Checkbox.Root
          key={habit.id}
          checked={habitsInfo.completedHabits.includes(habit.id)}
          className="flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed"
        >
          <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-50 transition-colors group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-background">
            <Checkbox.Indicator>
              <FaCheck size={20} className="text-white" />
            </Checkbox.Indicator>
          </div>
          <span
            className={`font-semibold text-xl text-white leading-tight ${
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
