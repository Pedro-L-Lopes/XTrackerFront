import { useEffect, useState } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { getAllTasks, completedTask, importantTask } from "../slices/toDoSlice";
import { useSelector } from "react-redux";
import DayTasks from "../components/todo/DayTasks";
import CreateTask from "../components/todo/CreateTask";
import dayjs from "dayjs";

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

  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    dispatch(getAllTasks());
  }, [dispatch]);

  useEffect(() => {
    setTasks(todoTasks);
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

  const formattedDate = dayjs().format("dddd, DD [de] MMMM");

  return (
    <div className="p-5">
      <div className="mb-2 ml-8">
        <h1 className="text-2xl font-bold">Meu dia</h1>
        <h3 className="text-xs">{formattedDate}</h3>
      </div>

      <div className="flex justify-between ml-7 h-screen">
        <div className="w-full">
          <CreateTask />
          <DayTasks
            tasks={tasks}
            onCompletedTask={handleCompletedTask}
            onImportantTask={handleImportantTask}
          />
        </div>
      </div>

      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default ToDo;
