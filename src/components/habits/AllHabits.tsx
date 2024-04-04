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

  const renderWeekDays = (habit: Habit) =>
    habit.weekDays
      .map((dayIndex) => availableWeekDaysAbv[Number(dayIndex)])
      .filter(Boolean)
      .join(", ");

  return (
    <main className="flex flex-col overflow-y-auto custom-scrollbar max-h-[500px] md:w-[450px]">
      <select className="bg-zinc-900 text-3xl flex items-center text-center font-bold h-12 focus:outline-none border-b border-violet-600 ">
        <option className="">Todos os Hábitos</option>
        {availableWeekDays.map((weekDay, index) => (
          <option className="text-xl" key={index}>
            {weekDay}
          </option>
        ))}
      </select>

      {habits?.map((habit) => (
        <section
          className={`flex items-center mt-2 hover:bg-violet-600 rounded-sm mr-1 ${
            selectedHabitId === habit.id
              ? "bg-violet-600"
              : "hover:bg-violet-600"
          }`}
          key={habit.id}
        >
          <div
            className={`flex flex-col p-2 justify-center cursor-pointer rounded-sm mr-2 w-52`}
            onClick={() => handleHabitClick(habit.id)}
          >
            <p className="text-lg font-bold truncate">{habit.title}</p>
          </div>
          <div>
            <CiEdit
              size={30}
              className="hover:text-violet-100 cursor-pointer "
            />
          </div>
          <div>
            <CiTrash
              size={30}
              className="hover:text-red-600 cursor-pointer ml-2"
              onClick={() => deleteHabit(habit.id)}
            />
          </div>
        </section>
      ))}
    </main>
  );
};

export default AllHabits;
