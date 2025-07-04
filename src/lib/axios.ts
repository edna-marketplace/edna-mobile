import { AppError } from "@/utils/AppError";
import axios from "axios";

export const api = axios.create({
  baseURL: "https://edna-marketplace.shop",
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
