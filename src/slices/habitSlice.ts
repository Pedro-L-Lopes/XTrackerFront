import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import habitService from "../services/habitService";

interface HabitsState {
  habits: any[];
  habit: any;
  error: boolean;
  loading: boolean;
  success: boolean;
}

const initialState: HabitsState = {
  habits: [],
  habit: {},
  error: false,
  loading: false,
  success: false,
};

export const getSummary = createAsyncThunk(
  "habits/getSummary",
  async (_, thunkAPI) => {
    try {
      const habits = await habitService.getSummary();
      return habits;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const postHabit = createAsyncThunk(
  "habits/postHabit",
  async (habitData: { title: string; weekDays: number[] }, thunkAPI) => {
    const data = await habitService.postHabit(habitData);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

export const habitSlice = createSlice({
  name: "habit",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSummary.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.habits = action.payload;
      })
      .addCase(postHabit.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(postHabit.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.habit = action.payload;
        state.habits.unshift(state.habit);
      });
  },
});

export default habitSlice.reducer;
