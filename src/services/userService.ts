import { api, requestConfig } from "../lib/config";

// type User = {
//   userId: string;
//   userName: string;
//   email?: string;
//   createdAt: string;
// };

interface UpdateUser {
  userId: string;
  userName?: string;
  email?: string;
  currentPassword?: string;
  newPassword?: string;
  confirmNewPassword?: string;
}

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

const patchUserDetails = async (data: UpdateUser, token: string) => {
  const config = requestConfig("PATCH", data, token);

  try {
    const res = await fetch(api + `/user/update`, config).then((res) =>
      res.json().catch((err) => err)
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

const userService = {
  getUserDetails,
  patchUserDetails,
};

export default userService;
