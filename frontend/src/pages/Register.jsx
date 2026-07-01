import { useState, useEffect } from "react";
import { registerUser } from "../api/authApi";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showOtpBox, setShowOtpBox] = useState(false);
    const [otp, setOtp] = useState("");

    const OTP_TIME = 10 * 60;
    const [timeLeft, setTimeLeft] = useState(OTP_TIME);

    // ---------------- Register ----------------

    const handleRegister = async () => {
        try {
            const res = await registerUser({
                name,
                email,
                password,
            });

            toast.success(res);

            setShowOtpBox(true);
            setTimeLeft(OTP_TIME);

        } catch (err) {
            console.error(err);
            toast.error("Registration failed");
        }
    };

    // ---------------- Verify OTP ----------------

    const handleVerifyOtp = async () => {
        try {
            const response = await axios.post(
                "http://localhost:8081/api/auth/verify-otp",
                {
                    email,
                    otp,
                }
            );

            toast.success(response.data);

            navigate("/login");

        } catch (err) {
            toast.error(
                err.response?.data || "Verification failed"
            );
        }
    };

    // ---------------- Resend OTP ----------------

    const handleResendOtp = async () => {
        try {

            const response = await axios.post(
                `http://localhost:8081/api/auth/resend-otp?email=${email}`
            );

            toast.success(response.data);

            // Restart timer
            setTimeLeft(OTP_TIME);

        } catch (err) {

            toast.error(
                err.response?.data ||
                "Failed to resend OTP"
            );

        }
    };

    // ---------------- Timer ----------------

    useEffect(() => {

        if (!showOtpBox) return;

        if (timeLeft <= 0) return;

        const interval = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);

    }, [showOtpBox, timeLeft]);

    const formatTime = () => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;

        return `${minutes}:${seconds
            .toString()
            .padStart(2, "0")}`;
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#111827] px-5">

            <div className="w-full max-w-md bg-[#1f2937] rounded-2xl shadow-2xl p-8">

                <h2 className="text-4xl font-bold text-cyan-400 mb-8">
                    Create Account
                </h2>

                <input
                    className="w-full p-3 mb-4 rounded-lg text-black outline-none"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    className="w-full p-3 mb-4 rounded-lg text-black outline-none"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    className="w-full p-3 mb-6 rounded-lg text-black outline-none"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {!showOtpBox ? (

                    <button
                        onClick={handleRegister}
                        className="w-full bg-cyan-500 hover:bg-cyan-600 transition text-gray-900 dark:text-white font-semibold py-3 rounded-lg"
                    >
                        Register
                    </button>

                ) : (

                    <div className="border-t border-gray-700 pt-6">

                        <p className="text-gray-300 text-center mb-4">
                            Enter the OTP sent to
                            <br />
                            <span className="text-cyan-400 font-medium">
                                {email}
                            </span>
                        </p>

                        <input
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="w-full p-3 mb-4 rounded-lg text-black outline-none"
                        />

                        <button
                            onClick={handleVerifyOtp}
                            className="w-full bg-green-500 hover:bg-green-600 transition text-gray-900 dark:text-white font-semibold py-3 rounded-lg mb-4"
                        >
                            Verify OTP
                        </button>

                        {timeLeft > 0 ? (

                            <div className="text-center mb-4">

                                <p className="text-gray-300 text-sm">
                                    Resend OTP in
                                </p>

                                <p className="text-cyan-400 font-bold text-lg">
                                    {formatTime()}
                                </p>

                            </div>

                        ) : (

                            <button
                                onClick={handleResendOtp}
                                className="w-full bg-cyan-500 hover:bg-cyan-600 transition text-gray-900 dark:text-white font-semibold py-3 rounded-lg mb-4"
                            >
                                Resend OTP
                            </button>

                        )}

                    </div>

                )}

                <p className="mt-8 text-center text-gray-300">

                    Already have an account?{" "}

                    <Link
                        to="/login"
                        className="text-cyan-400 hover:underline"
                    >
                        Login here
                    </Link>

                </p>

            </div>

        </div>
    );
}

export default Register;