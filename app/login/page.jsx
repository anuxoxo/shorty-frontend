"use client";

import { useState } from "react";
import { api } from "@/utils/api";
import { useRouter } from "next/navigation";
import { ACCESS_TOKEN } from "@/utils/constants";
import googleIcon from "@/assets/google.png";
import { motion } from "framer-motion"; // For animations
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.login({ email, password });
      localStorage.setItem(ACCESS_TOKEN, data.accessToken); // Store JWT token
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google`;
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600">
      <motion.div
        className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login to Your Account
        </h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {error && (
            <div className="text-center text-red-500 text-sm mt-2">{error}</div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition duration-300"
          >
            Login
          </button>

          <div className="text-center text-gray-500 mt-4">OR</div>

          {/* Google Login Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex gap-2 justify-center items-center w-full py-3 bg-gray-100 text-gray-800 border border-gray-300 rounded-lg font-semibold hover:bg-gray-200 transition duration-300"
          >
            <Image
              src={googleIcon}
              alt="Google Icon"
              width={20}
              height={20}
              className="rounded-full border"
            />
            Login with Google
          </button>

          <div className="text-center text-gray-600 mt-4">
            <p>
              Don't have an account?{" "}
              <a href="/register" className="text-indigo-600 hover:underline">
                Register here
              </a>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
