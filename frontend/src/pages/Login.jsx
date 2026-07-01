import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { loginUser } from "../api/authApi";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";


function Login() {

    const { login } = useContext(AuthContext);

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error] = useState("");

    const handleLogin = async () => {

        try {

            const res = await loginUser({
                email,
                password
            });

            if (res.token) {

                login(res.token);
                toast.success("Login successful");
                navigate("/dashboard");

            } else {

                toast.error(res.message || "Login failed");
            }

        } catch (err) {

            toast.error("Server error");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-900 dark:text-white">

            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl w-96">

                <h2 className="text-2xl mb-6 text-cyan-400">
                    Login
                </h2>

                {error && (
                    <p className="text-red-400 mb-3">
                        {error}
                    </p>
                )}

                <input
                    className="w-full p-2 mb-3 text-black rounded"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    className="w-full p-2 mb-4 text-black rounded"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <div className="flex justify-end mb-4">
                    <Link
                        to="/forgot-password"
                        className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
                    >
                        Forgot Password?
                    </Link>
                </div>

                <button
                    onClick={handleLogin}
                    className="bg-cyan-500 hover:bg-cyan-600 w-full py-2 rounded"
                >
                    Login
                </button>

                <p className="mt-4 text-sm text-center">
                    Don’t have an account?{" "}
                    <Link
                        to="/register"
                        className="text-cyan-400"
                    >
                        Register here
                    </Link>
                </p>

            </div>
        </div>
    );
}

export default Login;