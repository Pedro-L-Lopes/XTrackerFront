// lib
import { api } from "../lib/api";

// User
const userString = localStorage.getItem("user");
const user = userString ? JSON.parse(userString) : null;

export const postHabit = async (data: {
  title: string;
  weekDays: number[];
}) => {
  try {
    const response = await api.post("/habit/", {
      ...data,
      userId: user.userId,
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getSummary = async (year: string) => {
  try {
    const response = await api.get("/habit/summary", {
      params: {
        userId: user.userId,
        year: year,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getHabitsForDay = async (date: Date) => {
  try {
    const response = await api.get("/habit/day", {
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
      `/habit/${habitId}/toggle?date=${date.toISOString()}`
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const editHabit = async (habitId: string, newTitle: string) => {
  try {
    const response = await api.put(`/habit/${habitId}/edit`, {
      title: newTitle,
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllHabits = async () => {
  try {
    const response = await api.get(`/habit/allhabits?userId=${user.userId}`);
    return response.data;
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
};

export const getHabitMetrics = async (id: string) => {
  try {
    const response = await api.get(`/habit/${id}/habitmetrics`);
    return response;
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
};

export const deleteHabit = async (id: string) => {
  try {
    const response = await api.delete(`/habit/${id}`);
    return response;
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
};
