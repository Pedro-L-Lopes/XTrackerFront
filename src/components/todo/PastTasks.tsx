import dayjs from "dayjs";
import TaskItemPast from "./TaskItemPast";
import { useState } from "react";

type Task = {
  id: string;
  title: string;
  isCompleted: boolean;
  isImportant: boolean;
  createdAt: Date;
  userId: string;
};

interface DayTasksProps {
  tasks: Task[];
  onCompletedTask: (taskId: string) => void;
  onImportantTask: (taskId: string) => void;
}

const PastTasks = ({
  tasks,
  onCompletedTask,
  onImportantTask,
}: DayTasksProps) => {
  const [isCompletedOpen, setIsCompletedOpen] = useState<boolean>(false);

  const todayFormat = dayjs().format("YYYY-MM-DD");

  const incompleteTasks = tasks
    .filter(
      (task) =>
        !task.isCompleted &&
        dayjs(task.createdAt).format("YYYY-MM-DD") != todayFormat
    )
    .reverse();

  const completedTasks = tasks.filter((task) => task.isCompleted);
  return (
    <main className="flex flex-col border-l border-zinc-900 p-1 w-72 h-screen">
      <div className="flex items-center justify-between"></div>
      <ul>
        {incompleteTasks.length > 0 ? (
          incompleteTasks.map((task) => (
            <TaskItemPast
              key={task.id}
              task={task}
              onCompletedTask={onCompletedTask}
              onImportantTask={onImportantTask}
            />
          ))
        ) : (
          <p></p>
        )}
      </ul>
    </main>
  );
};

export default PastTasks;
