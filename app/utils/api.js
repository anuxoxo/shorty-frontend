import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Centralized error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || "Something went wrong!";
    return Promise.reject(new Error(message));
  }
);

export const api = {
  login: (data) => axiosInstance.post("/auth/login", data),
  register: (data) => axiosInstance.post("/auth/register", data),
  googleLogin: () => axiosInstance.get("/auth/google"),
  shortenUrl: (data) => axiosInstance.post("/url", data),
  getUrls: () => axiosInstance.get("/url"),
  deleteUrl: (id) => axiosInstance.delete(`/url/${id}`),
  getStats: () => axiosInstance.get("/stats"),
  getTopUrls: () => axiosInstance.get("/top-urls"),
};
