import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { useState } from "react";
import TaskItem from "../todo/TaskItem";

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
  onEditTask: (task: Task) => void;
}

const ImportantTasks = ({
  tasks,
  onCompletedTask,
  onImportantTask,
  onEditTask,
}: DayTasksProps) => {
  const [isCompletedOpen, setIsCompletedOpen] = useState<boolean>(false);

  const incompleteTasks = tasks.filter((task) => !task.isCompleted).reverse();

  const completedTasks = tasks.filter((task) => task.isCompleted).reverse();

  return (
    <div className="w-full">
      <div className="mb-4">
        <ul>
          {incompleteTasks.length > 0 ? (
            incompleteTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onCompletedTask={onCompletedTask}
                onImportantTask={onImportantTask}
                onEditTask={onEditTask}
              />
            ))
          ) : (
            <p></p>
          )}
        </ul>
      </div>

      <div>
        <div
          className="flex items-center cursor-pointer bg-zinc-900 p-2 rounded-md"
          style={{ width: "12%" }}
          onClick={() => setIsCompletedOpen(!isCompletedOpen)}
        >
          <h2 className="text-base font-normal">
            Concluída {completedTasks.length}
          </h2>
          {isCompletedOpen ? (
            <IoChevronUp className="ml-2" size={20} />
          ) : (
            <IoChevronDown className="ml-2" size={20} />
          )}
        </div>
        <ul
          className={`transition-max-height duration-300 ease-in-out overflow-hidden ${
            isCompletedOpen ? "max-h-screen" : "max-h-0"
          }`}
        >
          {completedTasks.length > 0 ? (
            completedTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onCompletedTask={onCompletedTask}
                onImportantTask={onImportantTask}
                onEditTask={onEditTask}
              />
            ))
          ) : (
            <p></p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ImportantTasks;
