import {
  IoRadioButtonOff,
  IoCheckmarkCircleOutline,
  IoStarOutline,
  IoStar,
} from "react-icons/io5";

type TaskItemProps = {
  task: {
    id: string;
    title: string;
    isCompleted: boolean;
    isImportant: boolean;
    createdAt: Date;
    userId: string;
  };
  onCompletedTask: (taskId: string) => void;
  onImportantTask: (taskId: string) => void;
};

const TaskItem = ({
  task,
  onCompletedTask,
  onImportantTask,
}: TaskItemProps) => {
  const handleCompletedTask = () => {
    onCompletedTask(task.id);
  };

  const handleImportantTask = () => {
    onImportantTask(task.id);
  };

  return (
    <li
      key={task.id}
      className={`group mt-1 p-2 bg-zinc-900 hover:bg-zinc-800 rounded-md transition-all flex items-center justify-between hover:cursor-pointer animate-fadeIn ${
        task.isCompleted ? "line-through text-gray-500" : ""
      }`}
    >
      <div className="flex items-center">
        {task.isCompleted ? (
          <IoCheckmarkCircleOutline
            className="text-teal-600 mr-2"
            size={23}
            onClick={handleCompletedTask}
          />
        ) : (
          <div className="relative">
            <IoRadioButtonOff className="text-gray-500 mr-2" size={23} />
            <IoCheckmarkCircleOutline
              className="text-teal-600 opacity-0 group-hover:opacity-50 absolute top-0 left-0"
              size={23}
              onClick={handleCompletedTask}
            />
          </div>
        )}
        <span
          className={`text-lg transition-all ${
            task.isCompleted ? "line-through text-gray-500" : ""
          }`}
        >
          {task.title}
        </span>
      </div>
      <div className="hover:text-teal-600 transition-all">
        {task.isImportant ? (
          <IoStar size={20} onClick={handleImportantTask} />
        ) : (
          <IoStarOutline size={20} onClick={handleImportantTask} />
        )}
      </div>
    </li>
  );
};

export default TaskItem;
