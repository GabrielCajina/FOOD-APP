import axios from "axios";

export const Axios = axios.create({
  withCredentials: true,
  baseURL: process.env.BASE_URL,
});
