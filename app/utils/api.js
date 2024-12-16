import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // To send cookies (like refresh token)
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to refresh access token
const refreshAccessToken = async () => {
  try {
    const response = await axios.post("/auth/refresh-token");
    return response.data.accessToken;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw new Error("Unable to refresh token.");
  }
};

// Axios request interceptor to add access token to the headers
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("accessToken");

    // Check if token exists and is expired
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Axios response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired, attempt to refresh
      try {
        const newToken = await refreshAccessToken();
        // Store new token in localStorage or cookies
        localStorage.setItem("accessToken", newToken);

        // Retry the original request with the new token
        error.config.headers["Authorization"] = `Bearer ${newToken}`;
        return axiosInstance(error.config);
      } catch (refreshError) {
        console.error("Token refresh failed", refreshError);
        window.location.href = "/login"; // Redirect to login if refresh fails
      }
    }
    return Promise.reject(error);
  }
);

export const api = {
  login: (data) => axiosInstance.post("/auth/login", data),
  register: (data) => axiosInstance.post("/auth/register", data),
  googleLogin: () => axiosInstance.get("/auth/google"),
  manageUrls: () => axiosInstance.get("/url/manage"),
  deleteUrl: (shortUrl) => axiosInstance.delete("/url/" + shortUrl),
  shortenUrl: (data) => axiosInstance.post("/url/shorten", data),
};
