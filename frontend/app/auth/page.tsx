'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";

import { login, signup } from "@/api/auth";

const AuthPage = () => {
    const router = useRouter();

    const [isLogin, setIsLogin] = useState(true);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const doLogin = async (email: string, password: string) => {
        const result = await login({ email, password });

        if (result.data) {
            localStorage.setItem("token", result.data.token);
        }
    };

    const handleLogin = async () => {
        try {
            await doLogin(email, password);
            router.push("/");
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    const handleSignup = async () => {
        try {
            await signup({ name, email, password });
            await doLogin(email, password);
            router.push("/");
        } catch (error) {
            console.error("Signup failed:", error);
        }
    };

    return (
        <div className="w-full flex-1 flex items-center justify-center flex-col gap-8">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm flex flex-col gap-4">

                <h2 className="text-2xl text-zinc-900 font-semibold text-center">
                    {isLogin ? "Login" : "Signup"}
                </h2>

                {!isLogin && <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                />}

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                />

                <button
                    onClick={isLogin ? handleLogin : handleSignup}
                    className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 cursor-pointer transition"
                >
                    {isLogin ? "Login" : "Sign up"}
                </button>

                <p className="text-sm text-center text-gray-500">
                    {isLogin ? "No account?" : "Already have an account?"}

                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="ml-1 text-blue-400 hover:text-blue-600 underline cursor-pointer transition"
                    >
                        {isLogin ? "Sign up" : "Login"}
                    </button>
                </p>
            </div>
        </div>
    );
}

export default AuthPage;