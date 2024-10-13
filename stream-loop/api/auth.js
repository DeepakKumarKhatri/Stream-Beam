import axiosClient from "@/axiosClient";

export const LoginApi = async (data) => {
    const response = await axiosClient.post("auth/login", data);
    return response.data;
};
