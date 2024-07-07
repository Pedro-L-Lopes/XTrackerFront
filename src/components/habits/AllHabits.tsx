// Hooks
import { useState, useEffect } from "react";

// Api
import {
  getAllHabits,
  deleteHabit as deleteHabitApi,
  editHabit,
} from "../../services/habitsService";

// Icons
import { CiEdit, CiTrash } from "react-icons/ci";
import { IoCheckmark } from "react-icons/io5";
import { TbRefresh } from "react-icons/tb";

// Utils
import { availableWeekDays } from "../../utils/week-days";

// Interfaces
interface Habit {
  id: string;
  title: string;
  created_at: string;
  weekDays: any;
}

// Components
import * as Popover from "@radix-ui/react-popover";
import * as Tolltip from "@radix-ui/react-tooltip";

type Props = {
  onChangeId: (id: string) => void;
};

const AllHabits = ({ onChangeId }: Props) => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [selectedHabitId, setSelectedHabitId] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(8);
  const [refreshClicked, setRefreshClicked] = useState<boolean>(false);
  const [editingHabitId, setEditingHabitId] = useState<string | null>(null);
  const [editingTitleText, setEditingTitleText] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      setTimeout(async () => {
        const habitsData = await getAllHabits();
        setHabits(habitsData);
      }, 1000);
    };
    fetchData();
  }, [refreshClicked]);

  const handleEditTitle = async (habitId: string) => {
    try {
      await editHabit(habitId, editingTitleText);
      const updatedHabits = habits.map((habit) =>
        habit.id === habitId ? { ...habit, title: editingTitleText } : habit
      );
      setHabits(updatedHabits);
      setEditingHabitId(null);
      setEditingTitleText("");
    } catch (error) {
      console.log("Error editing habit title:", error);
    }
  };

  const deleteHabit = async (id: string) => {
    try {
      await deleteHabitApi(id);
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

  const handleRefreshClick = () => {
    setRefreshClicked(!refreshClicked);
  };

  const filteredHabits =
    selectedDay !== 8
      ? habits.filter((habit) => habit.weekDays.includes(selectedDay))
      : habits;

  return (
    <main className="flex flex-col overflow-y-auto custom-scrollbar max-h-[500px] md:w-[450px]">
      <div className="flex justify-between items-center mx-10 border-b border-violet-600">
        <select
          className="bg-zinc-900 text-xl flex items-center text-center font-bold h-12 focus:outline-none"
          onChange={(e) => setSelectedDay(Number(e.target.value))}
        >
          <option value={8}>Todos os Hábitos</option>
          {availableWeekDays.map((weekDay, index) => (
            <option className="text-xl" key={index} value={index}>
              {weekDay}
            </option>
          ))}
        </select>
        <Tolltip.TooltipProvider>
          <Tolltip.Tooltip>
            <Tolltip.TooltipContent sideOffset={5} side="top" align="center">
              Clique para atualizar
            </Tolltip.TooltipContent>
            <button onClick={handleRefreshClick}>
              <TbRefresh size={24} />
            </button>
          </Tolltip.Tooltip>
        </Tolltip.TooltipProvider>
      </div>

      {filteredHabits.length > 0 ? (
        filteredHabits.map((habit) => (
          <section
            className={`flex items-center mt-2 hover:bg-violet-600 rounded-sm mr-1 ${
              selectedHabitId === habit.id
                ? "bg-violet-600"
                : "hover:bg-violet-600"
            }`}
            key={habit.id}
          >
            <div
              className={`flex flex-col p-2 justify-center cursor-pointer rounded-sm mr-2 w-52 animate-fadeIn`}
              onClick={() => handleHabitClick(habit.id)}
            >
              {editingHabitId === habit.id ? (
                <input
                  type="text"
                  value={editingTitleText}
                  onChange={(e) => setEditingTitleText(e.target.value)}
                  className="bg-transparent text-white text-lg font-bold truncate border-b focus:outline-none"
                />
              ) : (
                <p className="text-lg font-bold truncate">{habit.title}</p>
              )}
            </div>
            <div>
              {editingHabitId === habit.id ? (
                <button
                  onClick={() => handleEditTitle(habit.id)}
                  className="hover:text-violet-100 cursor-pointer hover:opacity-80"
                >
                  <IoCheckmark size={30} />
                </button>
              ) : (
                <CiEdit
                  size={30}
                  className="hover:text-violet-100 cursor-pointer"
                  onClick={() => {
                    setEditingHabitId(habit.id);
                    setEditingTitleText(habit.title);
                  }}
                />
              )}
            </div>
            <div>
              <Popover.Root>
                <Popover.Trigger>
                  <CiTrash
                    size={30}
                    className="hover:text-red-600 cursor-pointer ml-2"
                  />
                </Popover.Trigger>

                <Popover.Portal>
                  <Popover.Content className="min-w-[320px] max-h-[330px] p-6 rounded-md bg-zinc-900 border border-violet-600 flex flex-col overflow-y-auto custom-scrollbar">
                    <div className="flex flex-col justify-between items-center">
                      <h2 className="font-bold">
                        Tem certeza que deseja excluir esse hábito?
                      </h2>
                      <h2 className="font-bold">
                        Todo o histórico será apagado
                      </h2>
                      <div className="flex justify-between gap-5">
                        <button
                          onClick={() => deleteHabit(habit.id)}
                          className="p-1 rounded-md font-bold mt-2 hover:text-red-500"
                        >
                          SIM
                        </button>
                        <Popover.Close className="p-1 bg-violet-500 rounded-md font-bold mt-2 hover:bg-violet-400">
                          NÃO
                        </Popover.Close>
                      </div>
                    </div>

                    <Popover.Arrow
                      height={8}
                      width={16}
                      className="fill-zinc-500"
                    />
                  </Popover.Content>
                </Popover.Portal>
              </Popover.Root>
            </div>
          </section>
        ))
      ) : (
        <p className="text-center">Seus hábitos aparecerão aqui</p>
      )}
    </main>
  );
};

export default AllHabits;
