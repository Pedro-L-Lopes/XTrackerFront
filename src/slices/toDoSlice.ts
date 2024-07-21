import Cookies from "js-cookie";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toDoService from "../services/toDoService";

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

type ToDoState = {
  toDo: Task | null;
  loading: boolean;
  error: string | null;
  success: boolean;
};

const userId = Cookies.get("id");
const token = Cookies.get("token");

const initialState: ToDoState = {
  toDo: null,
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

      if (res.status == "Error") {
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
      state.toDo = null;
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
        state.success = false;
        state.toDo = action.payload;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { reset } = toDoSlice.actions;
export default toDoSlice.reducer;
