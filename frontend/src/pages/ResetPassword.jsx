import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Lock, ShieldCheck } from "lucide-react";

function ResetPassword() {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const token = searchParams.get("token");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {

            setLoading(true);

            const response = await axios.post(
                "http://localhost:8081/api/auth/reset-password",
                {
                    token,
                    newPassword: password,
                }
            );

            setMessage(response.data);

            setTimeout(() => {
                navigate("/login");
            }, 2000);

        } catch (err) {

            console.log(err);

            setError(
                err.response?.data ||
                "Unable to reset password."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-950 flex items-center justify-center px-5">

            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl w-full max-w-md p-8">

                <div className="flex justify-center mb-6">

                    <div className="bg-blue-500 p-4 rounded-full">

                        <ShieldCheck size={34} className="text-gray-900 dark:text-white"/>

                    </div>

                </div>

                <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
                    Reset Password
                </h1>

                <p className="text-center text-gray-300 mt-2 mb-8">
                    Create a strong password to secure your vault.
                </p>

                {message && (

                    <div className="bg-green-500/20 border border-green-400 text-green-300 rounded-xl p-3 mb-5 text-center">
                        {message}
                    </div>

                )}

                {error && (

                    <div className="bg-red-500/20 border border-red-400 text-red-300 rounded-xl p-3 mb-5 text-center">
                        {error}
                    </div>

                )}

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>

                        <label className="text-gray-300 text-sm">
                            New Password
                        </label>

                        <div className="relative mt-2">

                            <Lock
                                className="absolute left-4 top-4 text-gray-300"
                                size={20}
                            />

                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                                placeholder="Enter new password"
                                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                        </div>

                    </div>

                    <div>

                        <label className="text-gray-300 text-sm">
                            Confirm Password
                        </label>

                        <div className="relative mt-2">

                            <Lock
                                className="absolute left-4 top-4 text-gray-300"
                                size={20}
                            />

                            <input
                                type="password"
                                required
                                value={confirmPassword}
                                onChange={(e)=>setConfirmPassword(e.target.value)}
                                placeholder="Confirm password"
                                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                        </div>

                    </div>

                    <button
                        disabled={loading}
                        className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition text-gray-900 dark:text-white font-semibold disabled:opacity-60"
                    >
                        {loading ? "Updating..." : "Reset Password"}
                    </button>

                </form>

            </div>

        </div>

    );

}

export default ResetPassword;