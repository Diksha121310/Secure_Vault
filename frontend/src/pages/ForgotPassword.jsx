import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setMessage("");
        setError("");

        try {

            const response = await axios.post(
                "http://localhost:8081/api/auth/forgot-password",
                {
                    email,
                }
            );

            setMessage(response.data);

        } catch (err) {

            console.log("Forgot Password Error:", err);
    console.log("Response:", err.response);

    setError(
        err.response?.data?.message ||
        err.response?.data ||
        err.message ||
        "Unable to send reset link."
    );

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">

            <div className="w-[480px] bg-[#1e293b] rounded-2xl shadow-xl p-10">

                <h2 className="text-4xl font-bold text-cyan-400 mb-3">
                    Forgot Password
                </h2>

                <p className="text-gray-300 mb-8">
                    Enter your registered email and we'll send you a reset link.
                </p>

                {message && (
                    <div className="mb-5 bg-green-500/20 border border-green-500 text-green-300 rounded-lg p-3">
                        {message}
                    </div>
                )}

                {error && (
                    <div className="mb-5 bg-red-500/20 border border-red-500 text-red-300 rounded-lg p-3">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <input
                        type="email"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-4 rounded-md bg-white text-black mb-6 outline-none"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-cyan-500 hover:bg-cyan-600 text-gray-900 dark:text-white py-3 rounded-md font-semibold transition"
                    >
                        {loading ? "Sending..." : "Send Reset Link"}
                    </button>

                </form>

                <div className="text-center mt-7">

                    <Link
                        to="/login"
                        className="text-cyan-400 hover:text-cyan-300"
                    >
                        ← Back to Login
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default ForgotPassword;