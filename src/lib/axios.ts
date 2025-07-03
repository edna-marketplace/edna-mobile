import { AppError } from "@/utils/AppError";
import axios from "axios";

export const api = axios.create({
  baseURL: "http://31.97.31.201:8080",
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
