import axios from "axios";
import { SERVER_URL } from "./lib/constants";

import { getToken } from "./redux/features/userSlice";

const axiosClient = axios.create({
    baseURL: SERVER_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Add a request interceptor to pass the token with each request
axiosClient.interceptors.request.use(
    async (config) => {
        const token = getToken();
        if( token ) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }
);

export default axiosClient;