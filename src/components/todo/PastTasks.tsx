import dayjs from "dayjs";
import TaskItemPast from "./TaskItemPast";

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

const PastTasks = ({
  tasks,
  onCompletedTask,
  onImportantTask,
  onEditTask,
}: DayTasksProps) => {
  const todayFormat = dayjs().format("YYYY-MM-DD");

  const incompleteTasks = tasks
    .filter(
      (task) =>
        !task.isCompleted &&
        dayjs(task.createdAt).format("YYYY-MM-DD") != todayFormat
    )
    .reverse();

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
              onEditTask={onEditTask}
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
