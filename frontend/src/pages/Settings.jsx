import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

function Settings() {

    const { token, logout } = useContext(AuthContext);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    

    const handleChangePassword = async () => {

        if (!oldPassword || !newPassword) {

            toast.error("Fill all fields");
            return;
        }

        try {

            const res = await fetch(
                "http://localhost:8081/api/auth/change-password",
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token
                    },
                    body: JSON.stringify({
                        oldPassword,
                        newPassword
                    })
                }
            );

            const data = await res.text();

            if (res.ok) {

                toast.success(data);

                setOldPassword("");
                setNewPassword("");

            } else {

                toast.error(data);
            }

        } catch (err) {

            toast.error("Server error");
        }
    };

    return (

        <div className="max-w-2xl mx-auto">

            <div
                className="
        bg-gray-800/60
        backdrop-blur-lg
        border
        border-gray-700
        rounded-3xl
        p-8
        shadow-2xl
        text-white
    "
            >

                <div className="mb-8">

                    <h1 className="text-3xl font-bold">
                        Settings
                    </h1>

                    <p className="text-gray-300 mt-2">
                        Manage your account security
                    </p>

                </div>

                <div className="space-y-5">

                    <input
                        type="password"
                        placeholder="Current Password"
                        className="
                w-full
                bg-gray-900
                border
                border-gray-700
                rounded-xl
                px-4
                py-3
                text-white
                focus:border-cyan-500
                focus:outline-none
            "
                        value={oldPassword}
                        onChange={(e) =>
                            setOldPassword(e.target.value)
                        }
                    />

                    <input
                        type="password"
                        placeholder="New Password"
                        className="
                w-full
                bg-gray-900
                border
                border-gray-700
                rounded-xl
                px-4
                py-3
                text-white
                focus:border-cyan-500
                focus:outline-none
            "
                        value={newPassword}
                        onChange={(e) =>
                            setNewPassword(e.target.value)
                        }
                    />

                    <button
                        onClick={handleChangePassword}
                        className="
                            w-full
                            bg-cyan-500/20
                            hover:bg-cyan-500/30
                            border
                            border-cyan-500/20
                            text-cyan-300
                            px-6
                            py-3
                            rounded-xl
                            transition
                            font-medium
                        "
                    >
                        Update Password
                    </button>

                    <button
                        onClick={logout}
                        className="
                w-full
                bg-red-500/20
                hover:bg-red-500/30
                border
                border-red-500/30
                text-red-400
                py-3
                rounded-xl
                transition
            "
                    >
                        Logout
                    </button>

                </div>

            </div>


        </div>

    );

}

export default Settings;