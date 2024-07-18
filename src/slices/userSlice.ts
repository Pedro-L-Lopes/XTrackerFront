import Cookies from "js-cookie";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../services/userService";

type User = {
  userId: string;
  userName: string;
  email?: string;
  createdAt: string;
};

type UserState = {
  user: User | null;
  loading: boolean;
  error: string | null;
  success: boolean;
};

interface UpdateUser {
  errorMessage?: any;
  userId: string;
  userName?: string;
  email?: string;
  currentPassword?: string;
  newPassword?: string;
  confirmNewPassword?: string;
}

const userId = Cookies.get("id");
const token = Cookies.get("token");

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  success: false,
};

export const getUserDetails = createAsyncThunk(
  "user/details",
  async (_, thunkAPI) => {
    try {
      const res = await userService.getUserDetails(userId!, token!);

      if (!res) {
        throw new Error("Nenhum dado de usuário encontrado!");
      }

      return res as unknown as User;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const patchUserDetails = createAsyncThunk(
  "user/update",
  async (data: UpdateUser, thunkAPI) => {
    try {
      const res = await userService.patchUserDetails(data, token!);

      if (res.status == "Error") {
        return thunkAPI.rejectWithValue(res.message);
      }

      return res as User;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.success = false;
        state.user = action.payload;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(patchUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(patchUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload;
      })
      .addCase(patchUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
