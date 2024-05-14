import { api, requestConfig } from "../lib/config";
import Cookies from "js-cookie";

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

    if (res && res.token) {
      const userData = JSON.stringify({
        userName: res.userName,
        expiration: res.expiration,
        createdAt: res.createdAt,
      });

      localStorage.setItem("user", userData);
      Cookies.set("token", res.token, { expires: 7 });
      Cookies.set("id", res.userId, { expires: 7 });
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

    if (res && res.token) {
      const userData = JSON.stringify({
        userName: res.userName,
        expiration: res.expiration,
        createdAt: res.createdAt,
      });

      localStorage.setItem("user", userData);
      Cookies.set("token", res.token, { expires: 7 });
      Cookies.set("id", res.userId, { expires: 7 });
    }

    return res;
  } catch (error) {
    console.log(error);
  }
};

const logout = () => {
  Cookies.remove("token");
  Cookies.remove("id");
  localStorage.removeItem("reload");
  localStorage.removeItem("user");
};

const authService = {
  registerUser,
  loginUser,
  logout,
};

export default authService;
