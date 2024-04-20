import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";

const userString = localStorage.getItem("user");
const user = userString ? JSON.parse(userString) : null;

type User = {
  userName: string;
  email: string;
  password: string;
};

type InitialState = {
  user: User | void;
  error: boolean;
  loading: boolean;
  success: boolean;
};

const initialState: InitialState = {
  user: user || null,
  error: false,
  loading: false,
  success: false,
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (user: User, thunkAPI) => {
    const data = await authService.registerUser(user);

    // if (data.errors) {
    //   return thunkAPI.rejectWithValue(data.errors[0]);
    // }

    return data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.user = { userName: "", email: "", password: "" };
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
