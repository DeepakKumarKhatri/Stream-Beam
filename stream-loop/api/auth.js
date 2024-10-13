import axiosClient from "@/axiosClient";

export const LoginApi = async (data) => {
    const response = await axiosClient.post("auth/login", data);
    return response.data;
};

export const CurrentUserAPI = async () => {
    const response = await axiosClient.get("auth/current-user");
    return response.data;
};
