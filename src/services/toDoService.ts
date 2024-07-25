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

const getAllTasks = async (userId: string, token: string) => {
  const config = requestConfig("GET", null, token);

  try {
    const res = await fetch(
      api + `/todo/alltasks?userid=${userId}`,
      config
    ).then((res) => res.json().catch((err) => err));
    return res;
  } catch (error) {
    console.log(error);
  }
};

const completedTask = async (taskId: string, token: string) => {
  const config = requestConfig("PATCH", null, token);

  try {
    const res = await fetch(
      api + `/todo/iscompleted?taskid=${taskId}`,
      config
    ).then((res) => res.json().catch((err) => err));
    return res;
  } catch (error) {
    console.log(error);
  }
};

const importantTask = async (taskId: string, token: string) => {
  const config = requestConfig("PATCH", null, token);

  try {
    const res = await fetch(
      api + `/todo/isimportant?taskid=${taskId}`,
      config
    ).then((res) => res.json().catch((err) => err));
    return res;
  } catch (error) {
    console.log(error);
  }
};

const toDoService = {
  createTask,
  getAllTasks,
  completedTask,
  importantTask,
};

export default toDoService;
