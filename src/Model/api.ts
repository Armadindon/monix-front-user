import axios from "axios";
import { store } from "../store";


export const setToken = (token: string, rememberMe: boolean) => {
  if (rememberMe) window.localStorage.setItem("token", token);
};

export const getTokenFromLocalStorage = () => window.localStorage.getItem("token") || undefined;

export const authenticate = async (
  login: string,
  password: string,
  rememberMe: boolean
) => {
  const loginResponse = await axios.post(
    "http://localhost:1337/api/auth/local",
    {
      identifier: login,
      password,
    }
  );

  setToken(loginResponse.data.jwt, rememberMe);
};
