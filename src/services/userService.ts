import { api, requestConfig } from "../lib/config";

type User = {
  userId: string;
  userName: string;
  email?: string;
  createdAt: string;
};

const getUserDetails = async (userId: string, token: string) => {
  const config = requestConfig("GET", null, token);

  try {
    const res = await fetch(
      api + `/user/details?userid=${userId}`,
      config
    ).then((res) => res.json().catch((err) => err));
    return res;
  } catch (error) {
    console.log(error);
  }
};

const userService = {
  getUserDetails,
};

export default userService;
