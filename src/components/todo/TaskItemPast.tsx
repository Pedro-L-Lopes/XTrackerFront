import {
  IoRadioButtonOff,
  IoCheckmarkCircleOutline,
  IoAdd,
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

const TaskItemPast = ({
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
      className={`group mt-1 p-2 border-b border-zinc-900 transition-all flex items-center justify-between hover:cursor-pointer animate-fadeIn ${
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
      <div className="hover:scale-110 duration-200">
        <IoAdd size={20} onClick={handleImportantTask} />
      </div>
    </li>
  );
};

export default TaskItemPast;
