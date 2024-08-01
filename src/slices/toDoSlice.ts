import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toDoService from "../services/toDoService";
import Cookies from "js-cookie";

type Task = {
  id: string;
  title: string;
  isCompleted: boolean;
  isImportant: boolean;
  createdAt: Date;
  userId: string;
};

type CreateTask = {
  title: string;
  userId?: string;
};

interface ChangeTaskDateParams {
  taskId: string;
  date: string;
}

type ToDoState = {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  success: boolean;
};

const userId = Cookies.get("id");
const token = Cookies.get("token");

const initialState: ToDoState = {
  tasks: [],
  loading: false,
  error: null,
  success: false,
};

export const createTask = createAsyncThunk(
  "todo/create",
  async (data: CreateTask, thunkAPI) => {
    try {
      const dataWithUserId = { ...data, userId: userId! };

      const res = await toDoService.createTask(dataWithUserId, token!);

      if (res.status === "Error") {
        return thunkAPI.rejectWithValue(res.message);
      }

      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getAllTasks = createAsyncThunk(
  "todo/getall",
  async (_, thunkAPI) => {
    try {
      const res = await toDoService.getAllTasks(userId!, token!);

      if (res.status === "Error") {
        return thunkAPI.rejectWithValue(res.message);
      }

      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const completedTask = createAsyncThunk(
  "todo/completedtask",
  async (taskId: string, thunkAPI) => {
    try {
      const res = await toDoService.completedTask(taskId, token!);

      if (res.status === "Error") {
        return thunkAPI.rejectWithValue(res.message);
      }

      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const importantTask = createAsyncThunk(
  "todo/importanttask",
  async (taskId: string, thunkAPI) => {
    try {
      const res = await toDoService.importantTask(taskId, token!);

      if (res.status === "Error") {
        return thunkAPI.rejectWithValue(res.message);
      }

      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const changeTaskDate = createAsyncThunk(
  "todo/changeTaskDate",
  async (params: ChangeTaskDateParams, thunkAPI) => {
    const { taskId, date } = params;
    try {
      const res = await toDoService.changeTaskDate(taskId, date, token!);

      if (res.status === "Error") {
        return thunkAPI.rejectWithValue(res.message);
      }

      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "todo/deleteTaskask",
  async (taskId: string, thunkAPI) => {
    try {
      const res = await toDoService.deleteTask(taskId, token!);

      if (res.status === "Error") {
        return thunkAPI.rejectWithValue(res.message);
      }

      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const toDoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.tasks = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.tasks.push(action.payload as Task);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getAllTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.tasks = action.payload as Task[];
      })
      .addCase(getAllTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(completedTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(completedTask.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const updatedTask = action.payload as Task;
        const index = state.tasks.findIndex(
          (task) => task.id === updatedTask.id
        );
        if (index !== -1) {
          state.tasks[index] = updatedTask;
        }
      })
      .addCase(completedTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(importantTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(importantTask.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const updatedTask = action.payload as Task;
        const index = state.tasks.findIndex(
          (task) => task.id === updatedTask.id
        );
        if (index !== -1) {
          state.tasks[index] = updatedTask;
        }
      })
      .addCase(importantTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(changeTaskDate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeTaskDate.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.tasks.map((task) => {
          if (task.id === action.payload.id) {
            return task.createdAt === action.payload.task.createdAt;
          }
          return task;
        });
      })
      .addCase(changeTaskDate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;

        state.tasks = state.tasks.filter((task) => {
          return task.id !== action.payload.id;
        });
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { reset } = toDoSlice.actions;
export default toDoSlice.reducer;
