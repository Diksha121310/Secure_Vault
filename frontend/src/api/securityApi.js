import axiosInstance from "./axiosInstance";

export const getSecurityOverview = async () => {
    const response = await axiosInstance.get("/security/overview");
    return response.data;
};