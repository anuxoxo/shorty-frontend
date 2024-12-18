import axios from "axios";
import { ACCESS_TOKEN } from "./constants"; // Keep the constant, but it's not used directly anymore.

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // This will ensure cookies are sent with requests
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to refresh access token from the server
const refreshAccessToken = async () => {
  try {
    const response = await axiosInstance.post("/auth/refresh-token");
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw new Error("Unable to refresh token.");
  }
};

export const api = {
  login: (data) => axiosInstance.post("/auth/login", data),
  register: (data) => axiosInstance.post("/auth/register", data),
  googleLogin: () => axiosInstance.get("/auth/google"),
  manageUrls: () => axiosInstance.get("/url/manage"),
  deleteUrl: (shortUrl) => axiosInstance.delete("/url/" + shortUrl),
  shortenUrl: (data) => axiosInstance.post("/url/shorten", data),
  fetchUserDetails: () => axiosInstance.get("/auth/user-details"),
  logout: () => axiosInstance.get("/auth/logout"),
  editUrl: (shortUrl, data) => axiosInstance.put(`/url/${shortUrl}/edit`, data),
};
