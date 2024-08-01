import React, { useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { deleteTask } from "../../slices/toDoSlice";
import {
  IoRadioButtonOff,
  IoCheckmarkCircleOutline,
  IoStarOutline,
  IoStar,
} from "react-icons/io5";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

type Task = {
  id: string;
  title: string;
  isCompleted: boolean;
  isImportant: boolean;
  createdAt: Date;
  userId: string;
};

type TaskItemProps = {
  task: Task;
  onCompletedTask: (taskId: string) => void;
  onImportantTask: (taskId: string) => void;
  onEditTask: (task: Task) => void;
};

const TaskItem = ({
  task,
  onCompletedTask,
  onImportantTask,
  onEditTask,
}: TaskItemProps) => {
  const dispatch = useAppDispatch();
  const [showDialog, setShowDialog] = useState(false);

  const handleCompletedTask = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCompletedTask(task.id);
  };

  const handleImportantTask = (e: React.MouseEvent) => {
    e.stopPropagation();
    onImportantTask(task.id);
  };

  const handleEditTask = () => {
    // onEditTask(task);
    return;
  };

  const handleDeleteTask = (taskId: string) => {
    dispatch(deleteTask(taskId));
    setShowDialog(false);
  };

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowDialog(true);
  };

  return (
    <li
      key={task.id}
      className={`group mt-1 p-2 bg-zinc-900 hover:bg-zinc-800 rounded-md transition-all flex items-center justify-between hover:cursor-pointer animate-fadeIn z-0 ${
        task.isCompleted ? "line-through text-gray-500" : ""
      }`}
      onClick={handleEditTask}
      onContextMenu={handleRightClick}
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
      <div
        className="hover:scale-110 duration-200"
        onClick={handleImportantTask}
      >
        {task.isImportant ? (
          <IoStar size={20} className="text-red-400" />
        ) : (
          <IoStarOutline size={20} className="hover:text-red-400" />
        )}
      </div>
      {showDialog && (
        <AlertDialog.Root>
          <AlertDialog.Trigger asChild>
            <div className="absolute bg-white text-black p-2 rounded shadow-lg z-10">
              <button>Excluir</button>
            </div>
          </AlertDialog.Trigger>
          <AlertDialog.Portal>
            <AlertDialog.Overlay className="fixed inset-0 bg-black opacity-50" />
            <AlertDialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-lg z-20">
              <AlertDialog.Title className="text-lg font-bold">
                Confirmar Exclusão
              </AlertDialog.Title>
              <AlertDialog.Description className="mt-2">
                Tem certeza de que deseja excluir esta tarefa?
              </AlertDialog.Description>
              <div className="mt-4 flex justify-end space-x-2">
                <AlertDialog.Cancel asChild>
                  <button
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    onClick={() => setShowDialog(false)}
                  >
                    Cancelar
                  </button>
                </AlertDialog.Cancel>
                <AlertDialog.Action asChild>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    Excluir
                  </button>
                </AlertDialog.Action>
              </div>
            </AlertDialog.Content>
          </AlertDialog.Portal>
        </AlertDialog.Root>
      )}
    </li>
  );
};

export default TaskItem;
