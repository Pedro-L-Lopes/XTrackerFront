import { api, requestConfig } from "../lib/config";

const getSummary = async () => {
  const config = requestConfig("GET", null);

  try {
    const res = await fetch(api + "/summary", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

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

const habitService = {
  getSummary,
  postHabit,
};

export default habitService;
