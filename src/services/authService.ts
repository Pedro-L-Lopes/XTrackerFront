import { api, requestConfig } from "../lib/config";

type User = {
  userName: string;
  email?: string;
  password: string;
};

const registerUser = async (data: User) => {
  const config = requestConfig("POST", data, null);

  try {
    const res = await fetch(api + "/auth/register", config).then((res) =>
      res.json().catch((err) => err)
    );

    if (res) {
      localStorage.setItem("user", JSON.stringify(res));
    }
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (data: User) => {
  const config = requestConfig("POST", data, null);

  try {
    const res = await fetch(api + "/auth/login", config).then((res) =>
      res.json().catch((err) => err)
    );

    if (res) {
      localStorage.setItem("user", JSON.stringify(res));
    }
  } catch (error) {
    console.log(error);
  }
};

const authService = {
  registerUser,
  loginUser,
};

export default authService;