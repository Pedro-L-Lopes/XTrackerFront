import { useEffect, useState } from "react";
import {
  IoCheckmarkCircleOutline,
  IoRadioButtonOff,
  IoStar,
  IoStarOutline,
  IoSunny,
  IoSunnyOutline,
} from "react-icons/io5";

type Task = {
  id: string;
  title: string;
  isCompleted: boolean;
  isImportant: boolean;
  createdAt: Date;
  userId: string;
};

type EditTaskProps = {
  task: Task;
  onCompletedTask: (taskId: string) => void;
  onImportantTask: (taskId: string) => void;
  onEditTask: (task: Task) => void;
};

const EditTask = ({
  task,
  onCompletedTask,
  onImportantTask,
}: EditTaskProps) => {
  const [title, setTitle] = useState(task.title);
  const [isCompleted, setIsCompleted] = useState(task.isCompleted);
  const [isImportant, setIsImportant] = useState(task.isImportant);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    setTitle(task.title);
    setIsCompleted(task.isCompleted);
    setIsImportant(task.isImportant);
  }, [task]);

  const handleCompletedTask = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCompletedTask(task.id);
    setIsCompleted(!isCompleted);
  };

  const handleImportantTask = (e: React.MouseEvent) => {
    e.stopPropagation();
    onImportantTask(task.id);
    setIsImportant(!isImportant);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(new Date(e.target.value));
    setShowDatePicker(false);
  };

  return (
    <main className="flex flex-col items-center border-l border-zinc-900 w-72 h-screen">
      <button>X</button>
      <div className="flex items-center ml-1 cursor-pointer bg-zinc-900 p-2 rounded-sm">
        {!isCompleted ? (
          <IoRadioButtonOff
            className="text-gray-500 mr-2"
            size={23}
            onClick={handleCompletedTask}
          />
        ) : (
          <div className="relative">
            <IoCheckmarkCircleOutline
              className="text-teal-600 mr-2"
              size={23}
              onClick={handleCompletedTask}
            />
          </div>
        )}

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`text-lg transition-all bg-transparent focus:outline-none border-b ${
            isCompleted ? "line-through text-gray-500" : ""
          }`}
        />
        <div
          className="hover:scale-110 duration-200 cursor-pointer"
          onClick={handleImportantTask}
        >
          {isImportant ? (
            <IoStar size={20} className="text-red-400" />
          ) : (
            <IoStarOutline size={20} className="hover:text-red-400" />
          )}
        </div>
      </div>
      <div className="flex flex-col mt-2 w-full ml-2">
        <button className="flex items-center gap-3 p-2 text-teal-500 bg-zinc-900 mt-1 rounded-sm">
          <IoSunny />
          Adicionar ao meu dia
        </button>
        <button className="flex items-center gap-3 p-2 bg-zinc-900 mt-1 rounded-sm">
          <IoSunnyOutline />
          Remover do meu dia
        </button>
        <button onClick={() => setShowDatePicker(!showDatePicker)}>
          Escolher uma data
        </button>
        {showDatePicker && (
          <input
            type="date"
            onChange={handleDateChange}
            className="mt-2 p-2 bg-zinc-900 rounded-sm"
          />
        )}
      </div>

      <label className="bg-red-600">
        Escolher uma data
        <input type="date" className="hidden" />
      </label>
    </main>
  );
};

export default EditTask;
