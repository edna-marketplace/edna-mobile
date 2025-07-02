import { AppError } from "@/utils/AppError";
import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.1.45:8080",
});

api.interceptors.response.use(
  (response) => response,
  (requestError) => {
    if (requestError.response && requestError.response.data) {
      return Promise.reject(new AppError(requestError.response.data.message));
    } else {
      return Promise.reject(requestError);
    }
  }
);
