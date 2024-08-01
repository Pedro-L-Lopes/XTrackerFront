import { useEffect, useState } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { getAllTasks, completedTask, importantTask } from "../slices/toDoSlice";
import { useSelector } from "react-redux";
import DayTasks from "../components/todo/DayTasks";
import CreateTask from "../components/todo/CreateTask";
import dayjs from "dayjs";
import PastTasks from "../components/todo/PastTasks";
import { GoLightBulb } from "react-icons/go";
import { IoStarOutline, IoSunny, IoHomeOutline } from "react-icons/io5";
import AllTasks from "../components/todo/AllTasks";
import ImportantTasks from "../components/todo/ImportantTasks";
import EditTask from "../components/todo/EditTask";

type Task = {
  id: string;
  title: string;
  isCompleted: boolean;
  isImportant: boolean;
  createdAt: Date;
  userId: string;
};

const ToDo = () => {
  const dispatch = useAppDispatch();
  const { tasks: todoTasks, error } = useSelector((state: any) => state.todo);

  const [view, setView] = useState<string>("myDay");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [pastTasks, setPastTasks] = useState<boolean>(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    dispatch(getAllTasks());
  }, [dispatch]);

  useEffect(() => {
    setTasks(todoTasks);

    const hasPastTasks = todoTasks.some(
      (task: Task) =>
        dayjs(task.createdAt).isBefore(dayjs(), "day") && !task.isCompleted
    );
    setPastTasks(hasPastTasks);
  }, [todoTasks]);

  const handleCompletedTask = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
    dispatch(completedTask(taskId));
  };

  const handleImportantTask = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, isImportant: !task.isImportant } : task
      )
    );
    dispatch(importantTask(taskId));
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setPastTasks(false);
  };

  const togglePastTasks = () => {
    setPastTasks((prev) => !prev);
    setEditingTask(null);
  };

  return (
    <div className="p-5 flex justify-center gap-2">
      <section className="w-full">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-5 mb-2 ml-8">
            <button
              onClick={() => setView("myDay")}
              className={`p-1 font-bold text-sm rounded-sm flex items-center gap-1 ${
                view === "myDay"
                  ? "bg-teal-500 hover:bg-teal-400 text-white"
                  : ""
              }`}
            >
              <IoSunny />
              Meu dia
            </button>
            <button
              onClick={() => setView("importantTasks")}
              className={`p-1 font-bold text-sm rounded-sm flex items-center gap-1 ${
                view === "importantTasks"
                  ? "bg-red-400  hover:bg-red-300 text-white"
                  : ""
              }`}
            >
              <IoStarOutline />
              Importante
            </button>
            <button
              onClick={() => setView("allTasks")}
              className={`p-1 font-bold text-sm rounded-sm flex items-center gap-1 ${
                view === "allTasks"
                  ? "bg-teal-500 hover:bg-teal-400 text-white"
                  : ""
              }`}
            >
              <IoHomeOutline />
              Tarefas
            </button>
          </div>

          {view === "myDay" && (
            <div className="p-2 bg-zinc-900 hover:bg-zinc-800 rounded-md transition-all cursor-pointer">
              <GoLightBulb onClick={togglePastTasks} />
            </div>
          )}
        </div>

        <div className="flex justify-between ml-7 h-screen">
          <div className="w-full">
            <CreateTask />
            {view === "myDay" && (
              <DayTasks
                tasks={tasks}
                onCompletedTask={handleCompletedTask}
                onImportantTask={handleImportantTask}
                onEditTask={handleEditTask}
              />
            )}
            {view === "allTasks" && (
              <AllTasks
                tasks={tasks}
                onCompletedTask={handleCompletedTask}
                onImportantTask={handleImportantTask}
                onEditTask={handleEditTask}
              />
            )}
            {view === "importantTasks" && (
              <ImportantTasks
                tasks={tasks.filter((task) => task.isImportant)}
                onCompletedTask={handleCompletedTask}
                onImportantTask={handleImportantTask}
                onEditTask={handleEditTask}
              />
            )}
          </div>
        </div>
      </section>

      {view === "myDay" && pastTasks && !editingTask && (
        <div>
          <div>
            <h1 className="text-2xl font-bold">Sugestões</h1>
            <h3 className="text-xs">Tarefas passadas</h3>
          </div>
          <PastTasks
            tasks={tasks}
            onCompletedTask={handleCompletedTask}
            onImportantTask={handleImportantTask}
            onEditTask={handleEditTask}
          />
        </div>
      )}

      {editingTask && (
        <EditTask
          task={editingTask}
          onCompletedTask={handleCompletedTask}
          onImportantTask={handleImportantTask}
          onEditTask={handleEditTask}
        />
      )}

      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default ToDo;
