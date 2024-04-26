import axios from "axios";

const userString = localStorage.getItem("user");
const user = userString ? JSON.parse(userString) : null;

let headers = {};
if (user && user.token) {
  headers = {
    Authorization: `Bearer ${user.token}`,
  };
}

export const api = axios.create({
  baseURL: "https://localhost:7138/habit",
  headers: headers,
});
