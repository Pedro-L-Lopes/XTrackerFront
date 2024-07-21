// Hooks
import { useState, FormEvent } from "react";

// Redux
import { useAppDispatch } from "../hooks/useAppDispatch";
import { createTask } from "../slices/toDoSlice";
import { useSelector } from "react-redux";

const ToDo = () => {
  const dispatch = useAppDispatch();

  const { error, loading, success } = useSelector((state: any) => state.todo);

  const [title, setTitle] = useState<string>("");

  const submitHandle = async (e: FormEvent) => {
    e.preventDefault();

    await dispatch(createTask({ title }));

    setTitle("");
  };

  return (
    <div>
      <form onSubmit={submitHandle}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          required
        />
        <button type="submit">Add Task</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {success && <p>Task created successfully!</p>}
    </div>
  );
};

export default ToDo;
