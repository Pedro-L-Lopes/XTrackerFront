import { api, requestConfig } from "../lib/config";

type User = {
  userName: string;
  email?: string;
  password: string;
};

type UserLogin = {
  email: string;
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

    return res;
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (data: UserLogin) => {
  const config = requestConfig("POST", data, null);

  try {
    const res = await fetch(api + "/auth/login", config).then((res) =>
      res.json().catch((err) => err)
    );

    if (res.token) {
      localStorage.setItem("user", JSON.stringify(res));
    }

    return res;
  } catch (error) {
    console.log(error);
  }
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("reload");
};

const authService = {
  registerUser,
  loginUser,
  logout,
};

export default authService;
