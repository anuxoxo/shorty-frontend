"use client";

import { useState } from "react";
import { api } from "@/utils/api";
import { useRouter } from "next/navigation";
import { ACCESS_TOKEN } from "@/utils/constants";
import { motion } from "framer-motion"; // For animations
import { toast } from "react-toastify"; // React Toastify
import googleIcon from "@/assets/google.png";
import Image from "next/image";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const login = async () => {
    try {
      const { data } = await api.login({ email, password });
      localStorage.setItem(ACCESS_TOKEN, data.accessToken); // Store JWT token
      router.push("/dashboard");
    } catch (err) {
      setError(err?.response?.data?.error || "Login failed.");
      toast.error(
        err.message || err?.response?.data?.error || "An error occurred."
      );
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.register({ name, email, password });
      localStorage.setItem(ACCESS_TOKEN, data.token); // Store JWT token
      toast.success("Registration successful! Redirecting to dashboard...");
      setTimeout(() => {
        login();
      }, 2000); // Delay to show the success toast
    } catch (err) {
      setError(
        err?.response?.data?.error || "Registration failed. Please try again."
      );
      toast.error(err?.response?.data?.error || "An error occurred.");
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
          Create an Account
        </h1>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-gray-600 mb-1 font-medium">Name</label>
            <input
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-md w-full p-2 text-gray-700 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1 font-medium">
              Email
            </label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              className="border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-md w-full p-2 text-gray-700 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1 font-medium">
              Password
            </label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-md w-full p-2 text-gray-700 focus:outline-none"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium py-2 rounded-md hover:opacity-90 transition"
          >
            Register
          </button>
          <div className="relative flex items-center justify-center">
            <span className="bg-white px-2 text-gray-400 text-sm z-10">OR</span>
            <div className="absolute w-full border-t border-gray-300"></div>
          </div>
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
            Signin with Google
          </button>
        </form>
        <p className="text-center text-gray-500 text-sm mt-6">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-500 hover:text-blue-600 font-medium"
          >
            Login here
          </a>
        </p>
      </motion.div>
    </div>
  );
}
