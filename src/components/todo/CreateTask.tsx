// Hooks
import { useState, FormEvent } from "react";

// Redux
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { createTask, getAllTasks } from "../../slices/toDoSlice";
import { useSelector } from "react-redux";

// Icons
import { FiPlus } from "react-icons/fi";

const CreateTask = () => {
  const dispatch = useAppDispatch();
  const { error } = useSelector((state: any) => state.todo);
  const [title, setTitle] = useState<string>("");

  const submitHandle = async (e: FormEvent) => {
    e.preventDefault();

    if (!title) return;

    await dispatch(createTask({ title }));
    dispatch(getAllTasks());
    setTitle("");
  };

  return (
    <div className="text-center">
      <form
        onSubmit={submitHandle}
        className="w-full flex items-center bg-zinc-900 hover:bg-zinc-800 focus-within:bg-zinc-800 rounded-md transition-all p-1 mb-2"
      >
        <FiPlus className="ml-2 text-teal-600" />
        <input
          type="text"
          value={title}
          className="w-full p-2 bg-transparent focus:outline-none"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Adicionar uma tarefa"
        />
      </form>
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default CreateTask;
