import { api, requestConfig } from "../lib/config";

type CreateTask = {
  title: string;
  userId: string;
};

const createTask = async (data: CreateTask, token: string) => {
  const config = requestConfig("POST", data, token);

  try {
    const res = await fetch(api + `/todo`, config).then((res) =>
      res.json().catch((err) => err)
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

const toDoService = {
  createTask,
};

export default toDoService;
