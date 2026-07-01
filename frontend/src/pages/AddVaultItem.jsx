import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { addVaultItem } from "../api/vaultApi";

function AddVaultItem() {

    const { token } = useContext(AuthContext);

    const [title, setTitle] = useState("");
    const [data, setData] = useState("");

    const handleAdd = async () => {

        const res = await addVaultItem({
            title,
            encryptedData: data
        }, token);

        alert(res);

        window.location.href = "/dashboard";
    };

    return (
        <div>

            <h2>Add Vault Item</h2>

            <input
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
            />

            <br /><br />

            <textarea
                placeholder="Secret Data"
                onChange={(e) => setData(e.target.value)}
            />

            <br /><br />

            <button onClick={handleAdd}>
                Save Securely
            </button>

        </div>
    );
}

export default AddVaultItem;
