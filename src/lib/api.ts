import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");

let headers = {};
if (token) {
  headers = {
    Authorization: `Bearer ${token}`,
  };
}

export const api = axios.create({
  // baseURL: "https://localhost:7138",
  baseURL: "https://xtracker-g9f7hscca8gfhpc4.brazilsouth-01.azurewebsites.net",
  headers: headers,
});
