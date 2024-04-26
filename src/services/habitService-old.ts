import { api, requestConfig } from "../lib/config";

const postHabit = async (data: any) => {
  const config = requestConfig("POST", data);

  try {
    const res = await fetch(api + "/", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const getSummary = async (userId: string, token: string) => {
  const config = requestConfig("GET", null, token);

  try {
    const res = await fetch(api + "/habit/summary?userid=" + userId, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const getHabitDay = async (date: string, userId: string, token: string) => {
  const config = requestConfig("GET", null, token);

  try {
    const url = new URL(api + "/habit/day");
    url.searchParams.append("date", date);
    url.searchParams.append("userId", userId);

    const res = await fetch(url.toString(), config);
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

const pacthToggleHabit = async (
  habitId: string,
  date: string,
  token: string
) => {
  const config = requestConfig("PATCH", null, token);

  try {
    const res = await fetch(
      api + `/habit/${habitId}/toggle?date=${date}`,
      config
    )
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const habitService = {
  postHabit,
  getSummary,
  getHabitDay,
  pacthToggleHabit,
};

export default habitService;
