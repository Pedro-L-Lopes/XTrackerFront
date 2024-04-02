// service.js
import { api } from "../lib/api";

export const getAllHabits = async () => {
  try {
    const response = await api.get("/allhabits");
    return response.data;
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
};
