import Cookies from "js-cookie";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../services/userService";

// Tipagem do estado inicial e do usuário
type User = {
  id: string;
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

// Pegando userId e token dos Cookies
const userId = Cookies.get("id");
const token = Cookies.get("token");

// Estado inicial
const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  success: false,
};

// Thunk para buscar detalhes do usuário
export const getUserDetails = createAsyncThunk(
  "user/details",
  async (_, thunkAPI) => {
    try {
      const res = await userService.getUserDetails(userId!, token!);

      // Aqui você pode precisar adaptar a estrutura do res para garantir que ele é do tipo User
      if (!res) {
        throw new Error("No user data returned");
      }

      return res as unknown as User;
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
        state.success = true;
        state.user = action.payload;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Exportando as ações e o reducer
export const { reset } = userSlice.actions;
export default userSlice.reducer;
