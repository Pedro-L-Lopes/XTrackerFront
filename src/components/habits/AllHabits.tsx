// Hooks
import { useState, useEffect } from "react";

// Api
import { api } from "../../lib/api";
import { getAllHabits } from "../../services/habitsService";

// Icons
import { CiEdit, CiTrash } from "react-icons/ci";

// Utils
import { availableWeekDays, availableWeekDaysAbv } from "../../utils/week-days";

// Interfaces
import { Habit } from "../../interfaces/habits/IHabit";

type Props = {
  onChangeId: (id: string) => void;
};

const AllHabits = ({ onChangeId }: Props) => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [selectedHabitId, setSelectedHabitId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const habitsData = await getAllHabits();
      setHabits(habitsData);
    };
    fetchData();
  }, []);

  const deleteHabit = async (id: string) => {
    try {
      await api.delete(`/${id}`);
      const updatedHabits = habits.filter((habit) => habit.id !== id);
      setHabits(updatedHabits);
    } catch (error) {
      console.log("Error deleting habit:", error);
    }
  };

  const handleHabitClick = (id: string) => {
    setSelectedHabitId(id);
    onChangeId(id);
  };

  const renderWeekDays = (habit: Habit) => {
    const habitWeekDays = habit.weekDays.map(String);
    const habitWeekDaysAbbreviation = habitWeekDays
      .map((dayIndex) => availableWeekDaysAbv[Number(dayIndex)])
      .filter(Boolean);

    return habitWeekDaysAbbreviation.join(", ");
  };

  return (
    <main className="flex flex-col overflow-y-auto custom-scrollbar max-h-[500px] md:w-[400px]">
      <select className="bg-zinc-900 text-white text-2xl font-bold  selection:border-none focus:border-none ">
        <option className="">Todos os Hábitos</option>
        {availableWeekDays.map((weekDay, index) => (
          <option className="hover:bg-violet-600" key={index}>
            {weekDay}
          </option>
        ))}
      </select>

      {habits?.map((habit) => (
        <section
          className={`flex items-center hover:bg-violet-600 rounded-sm mr-1 ${
            selectedHabitId === habit.id
              ? "bg-violet-600"
              : "hover:bg-violet-600"
          }`}
          key={habit.id}
        >
          <div
            className={`mt-2 cursor-pointer rounded-sm mr-2 p-1 w-52 `}
            onClick={() => handleHabitClick(habit.id)}
          >
            <p className="font-bold">{habit.title}</p>
            <p className="text-xs opacity-85">
              Recorrência: {renderWeekDays(habit)}
            </p>
          </div>
          <div>
            <CiEdit
              size={30}
              className="hover:text-violet-100 cursor-pointer"
            />
          </div>
          <div>
            <CiTrash
              size={30}
              className="hover:text-red-600 cursor-pointer"
              onClick={() => deleteHabit(habit.id)}
            />
          </div>
        </section>
      ))}
    </main>
  );
};

export default AllHabits;
