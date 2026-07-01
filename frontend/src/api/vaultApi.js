import axiosInstance from "./axiosInstance";

// GET ITEMS
export const getVaultItems = async () => {

    const response =
        await axiosInstance.get("/vault/my-items");

    return response.data;
};

// ADD ITEM
export const addVaultItem = async (item) => {

    const response =
        await axiosInstance.post(
            "/vault/add",
            item
        );
        

    return response.data;
};

// UPDATE ITEM
export const updateVaultItem = async (
    id,
    item
) => {

    const response =
        await axiosInstance.put(
            `/vault/update/${id}`,
            item
        );

    return response.data;
};

// DELETE ITEM
export const deleteVaultItem = async (
    id
) => {

    const response =
        await axiosInstance.delete(
            `/vault/delete/${id}`
        );

    return response.data;
};