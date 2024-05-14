import axios from "axios";
import Cookies from "js-cookie";

// Obtém o token JWT dos cookies
const token = Cookies.get("token");
console.log(token);

let headers = {};
if (token) {
  headers = {
    Authorization: `Bearer ${token}`,
  };
}

export const api = axios.create({
  baseURL: "https://localhost:7138",
  headers: headers,
});
