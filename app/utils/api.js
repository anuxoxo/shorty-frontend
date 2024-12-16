import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add JWT Token to headers if it's available
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
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
  manageUrls: () => axiosInstance.get("/url/manage"),
  getStatistics: () => axiosInstance.get("/url/statistics"),
  deleteUrl: (shortUrl) => axiosInstance.delete("/url/" + shortUrl),
  getTopUrls: () => axiosInstance.get("/url/top"),
  shortenUrl: (data) => axiosInstance.post("/url/shorten", data),
};
