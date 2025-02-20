import { Base_url } from "./constent.js";
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: Base_url,
    timeout: 10000, // Adjust timeout as needed for your API
    headers: {
        "Content-Type": "application/json",
    },
});

// Optional: Add interceptors for request and response handling
axiosInstance.interceptors.request.use(
    (config) => {
        // You can add a token or modify headers here if needed
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        // Handle successful responses
        return response;
    },
    (error) => {
        // Handle errors globally (e.g., show a notification)
        console.error("API Error:", error.response || error.message);
        return Promise.reject(error);
    }
);

export default axiosInstance;
