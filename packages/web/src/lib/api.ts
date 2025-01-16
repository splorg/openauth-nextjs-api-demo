import axios from "axios";
import { cookies as getCookies } from "next/headers";

const API_URL = process.env.API_URL;

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// not needed if API is running on the same domain
api.interceptors.request.use(async (config) => {
  const cookies = await getCookies();
  const accessToken = cookies.get("access_token")?.value;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export const getUser = async () => {
  const { data } = await api.get("/protected");
  return data;
};
