import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Create an Axios instance
export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // To send cookies (like refresh token)
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to refresh access token
const refreshAccessToken = async () => {
  try {
    const response = await axiosInstance.post("/auth/refresh-token");
    return response.data.accessToken;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw new Error("Unable to refresh token.");
  }
};

// Axios request interceptor to add access token to the headers
axiosInstance.interceptors.request.use(
  (config) => {
    // Check if the token exists in localStorage
    const token = localStorage.getItem(ACCESS_TOKEN);

    if (token) {
      // If token exists, set it in Authorization header
      config.headers["Authorization"] = `Bearer ${token}`;
    } else {
      // If no token exists, make sure Authorization header is cleared
      delete config.headers["Authorization"];
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Axios response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Check if the error is a 401 (Unauthorized) and if the user is logged out

    if (error.response && error.response.status === 401) {
      // If the error is related to a token refresh failure or logged-out state
      if (
        error.response.data &&
        error.response.data.error === "Access token is missing."
      ) {
        // Handle logged-out state
        return Promise.reject(error); // Don't retry the request in this case
      }

      // Retry the request for non-logged-out 401 errors (token expiry or invalid token)
      if (!error.config._retry) {
        error.config._retry = true; // Prevent infinite retries
        try {
          const newToken = await refreshAccessToken();
          localStorage.setItem(ACCESS_TOKEN, newToken);

          // Update header and retry the original request
          error.config.headers["Authorization"] = `Bearer ${newToken}`;
          return axiosInstance(error.config);
        } catch (refreshError) {
          console.error("Token refresh failed", refreshError);
          localStorage.removeItem(ACCESS_TOKEN); // Clear token
          window.location.href = "/login"; // Redirect to login
          return Promise.reject(refreshError); // Reject the refresh token error
        }
      }
    }

    return Promise.reject(error); // If not a 401 or unable to handle the error
  }
);

export const api = {
  login: (data) => axiosInstance.post("/auth/login", data),
  register: (data) => axiosInstance.post("/auth/register", data),
  googleLogin: () => axiosInstance.get("/auth/google"),
  manageUrls: () => axiosInstance.get("/url/manage"),
  deleteUrl: (shortUrl) => axiosInstance.delete("/url/" + shortUrl),
  shortenUrl: (data) => axiosInstance.post("/url/shorten", data),
  fetchUserDetails: () => axiosInstance.get("/auth/user-details"),
  logout: () => axiosInstance.get("/auth/logout"),
};
