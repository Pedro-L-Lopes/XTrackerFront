// lib
import { api } from "../lib/api";

// User
const userString = localStorage.getItem("user");
const user = userString ? JSON.parse(userString) : null;

export const getHabitsForDay = async (date: Date) => {
  try {
    const response = await api.get("/day", {
      params: {
        date: date.toISOString(),
        userId: user.userId,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const patchToggleHabit = async (habitId: string, date: Date) => {
  try {
    const response = await api.patch(
      `/${habitId}/toggle?date=${date.toISOString()}`
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllHabits = async () => {
  try {
    const response = await api.get(`/allhabits?userId=${user.userId}`);
    return response.data;
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
};
