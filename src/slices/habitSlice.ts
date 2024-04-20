import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import habitService from "../services/habitService-old";

// Interfaces
import { HabitsInfo } from "../interfaces/habits/IHabitsInfo";
import { Summary } from "../interfaces/habits/ISummary";

interface User {
  token: string;
  // Outras propriedades do usuário, se houver
}

interface AuthState {
  user: User;
  // Outras propriedades de autenticação, se houver
}

interface RootStateWithAuth extends RootState {
  auth: AuthState;
}

interface RootState {
  auth: AuthState;
  habit: HabitsState;
}

interface HabitsState {
  summary: Summary;
  habits: any[];
  habit: any;
  habitsInfo: HabitsInfo;
  error: boolean;
  loading: boolean;
  success: boolean;
}

const initialState: HabitsState = {
  summary: [],
  habits: [],
  habit: {},
  habitsInfo: { possibleHabits: [], completedHabits: [] },
  error: false,
  loading: false,
  success: false,
};

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

export const getSummary = createAsyncThunk(
  "habits/getSummary",
  async (_, thunkAPI) => {
    const token = (thunkAPI.getState() as RootStateWithAuth).auth.user.token;

    try {
      const habits = await habitService.getSummary(token);
      return habits;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getHabitDay = createAsyncThunk(
  "habits/getHabitDay",
  async (date: string, thunkAPI) => {
    try {
      const habits = await habitService.getHabitDay(date);
      return habits;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const pacthToggleHabit = createAsyncThunk(
  "habits/pacthToggleHabit",
  async (data: { habitId: string; date: string }, thunkAPI) => {
    try {
      const habits = await habitService.pacthToggleHabit(
        data.habitId,
        data.date
      );
      return habits;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
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
        state.summary = action.payload;
      })
      .addCase(getHabitDay.pending, (state) => {
        state.loading = true;
        state.error = false;
      });
  },
});

export default habitSlice.reducer;
