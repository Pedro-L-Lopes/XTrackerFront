import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";

const userString = localStorage.getItem("user");
const user = userString ? JSON.parse(userString) : null;

type User = {
  userName: string;
  email?: string;
  password: string;
};

type UserLogin = {
  email: string;
  password: string;
};

type InitialState = {
  user: User | void | null;
  error: any;
  loading: boolean;
  success: boolean;
};

const initialState: InitialState = {
  user: user ? user : null,
  error: null,
  loading: false,
  success: false,
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (user: User, thunkAPI) => {
    const data: any = await authService.registerUser(user);

    if (data.status) {
      return thunkAPI.rejectWithValue(data.message);
    }

    return data;
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (user: UserLogin, thunkAPI) => {
    const data: any = await authService.loginUser(user);

    if (data.status === "Error") {
      return thunkAPI.rejectWithValue(data.message);
    }

    return data;
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.error = null;
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
        state.error = action.payload;
        state.user = { userName: "", email: "", password: "" };
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = { userName: "", password: "" };
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = { userName: "", password: "" };
        state.loading = false;
        state.success = true;
        state.error = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
