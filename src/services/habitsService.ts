import Cookies from "js-cookie";

// lib
import { api } from "../lib/api";
import dayjs from "dayjs";

// User
const userId = Cookies.get("id");

export const postHabit = async (data: {
  title: string;
  weekDays: number[];
}) => {
  try {
    const response = await api.post("/habit/", {
      ...data,
      userId: userId,
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
        userId: userId,
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
        userId: userId,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const patchToggleHabit = async (habitId: string, date: Date) => {
  try {
    const formattedDate = dayjs(date).format("YYYY-MM-DD");

    const response = await api.patch(
      `/habit/${habitId}/toggle?date=${formattedDate}`
    );

    console.log(formattedDate); 

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
    const response = await api.get(`/habit/allhabits?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
};

export const getHabitMetrics = async (
  id: string,
  startDate: string,
  endDate: string
) => {
  try {
    const response = await api.get(
      `/habit/${id}/habitmetrics?startDate=${startDate}&endDate=${endDate}`
    );
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
