import axiosInstance from "./axiosInstance";

export const getFiles = async () => {

    const response =
        await axiosInstance.get("/vault/files");

    return response.data;
};

export const downloadFile = async (id) => {

    const response =
        await axiosInstance.get(
            `/vault/download/${id}`,
            {
                responseType: "blob"
            }
        );

    return response.data;
};

export const deleteFile = async (id) => {

    const response =
        await axiosInstance.delete(
            `/vault/delete/${id}`
        );

    return response.data;
};