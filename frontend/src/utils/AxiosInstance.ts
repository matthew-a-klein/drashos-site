import axios, { InternalAxiosRequestConfig } from "axios";
import { config } from "../Config";
import jwtDecode from "jwt-decode";
import dayjs from "dayjs";

let authTokens = localStorage.getItem("authTokens")
  ? JSON.parse(localStorage.getItem("authTokens")!)
  : null;

const baseURL = config.urls.API_BASE_URL;

const AxiosInstance = axios.create({
  baseURL,
  headers: { Authorization: `Bearer ${authTokens?.access}` },
});

AxiosInstance.interceptors.request.use(
  async (req: InternalAxiosRequestConfig) => {
    if (!authTokens) {
      authTokens = localStorage.getItem("authTokens")
        ? JSON.parse(localStorage.getItem("authTokens")!)
        : null;
      req.headers!.Authorization = `Bearer ${authTokens?.access}`;
    }

    const exp: number = jwtDecode(authTokens.access);
    const isExpired = dayjs.unix(exp).diff(dayjs()) < 1;

    if (!isExpired) return req;

    const response = await axios.post(`${baseURL}/api/token/refresh/`, {
      refresh: authTokens.refresh,
    });

    localStorage.setItem("authTokens", JSON.stringify(response.data));
    req.headers!.Authorization = `Bearer ${response.data.access}`;
    return req;
  }
);

export default AxiosInstance;
