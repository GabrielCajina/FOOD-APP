import { Axios } from "./axios";

export interface AuthField {
  email: string;
  password: string;
}

export const login = async (form: { email: string; password: string }) => {
  const { data } = await Axios.post("/api/auth/login", form);
  return data;
};

export const register = async (form: { email: string; password: string }) => {
  const { data } = await Axios.post("/api/auth/register", form);
  return data;
};

export const logout = async () => {
  const { data } = await Axios.get("/api/auth/logout");
  return data;
};
