import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import habitService from "../services/habitServiceRedux";

// Interfaces
import { HabitsInfo } from "../interfaces/habits/IHabitsInfo";
import { Summary } from "../interfaces/habits/ISummary";

interface User {
  userId: string;
  token: string;
}

interface AuthState {
  user: User;
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
  message: string | null;
}

const initialState: HabitsState = {
  summary: [],
  habits: [],
  habit: {},
  habitsInfo: { possibleHabits: [], completedHabits: [] },
  error: false,
  loading: false,
  success: false,
  message: null,
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
  async (year: string, thunkAPI) => {
    const token = (thunkAPI.getState() as RootStateWithAuth).auth.user.token;

    const userString = localStorage.getItem("user");

    if (userString) {
      try {
        const user = JSON.parse(userString);
        const habits = await habitService.getSummary(user.userId, year, token);
        return habits;
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  }
);

export const getHabitDay = createAsyncThunk(
  "habits/getHabitDay",
  async (date: string, thunkAPI) => {
    const data = (thunkAPI.getState() as RootStateWithAuth).auth.user;

    try {
      const habits = await habitService.getHabitDay(
        date,
        data.userId,
        data.token
      );
      return habits;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const pacthToggleHabit = createAsyncThunk(
  "habits/pacthToggleHabit",
  async (data: { habitId: string; date: string }, thunkAPI) => {
    const token = (thunkAPI.getState() as RootStateWithAuth).auth.user.token;
    try {
      const habits = await habitService.pacthToggleHabit(
        data.habitId,
        data.date,
        token
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
      })
      .addCase(getHabitDay.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.habitsInfo = action.payload;
        console.log(action.payload);
      })
      .addCase(getHabitDay.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(pacthToggleHabit.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(pacthToggleHabit.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.message = action.payload;
        // state.products.map((product) => {
        //   if (product._id === action.payload.product._id) {
        //     return (product.name = action.payload.product.name);
        //   }
        //   return product;
        // });
      })
      .addCase(pacthToggleHabit.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.habit = {};
      });
  },
});

export default habitSlice.reducer;
