import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import habitReducer from "./slices/habitSlice";
import userReducer from "./slices/userSlice";
import todoReducer from "./slices/toDoSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    habit: habitReducer,
    user: userReducer,
    todo: todoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
