"use client";

import { useState } from "react";
import { api } from "@/utils/api";
import { useRouter } from "next/navigation";
import { ACCESS_TOKEN } from "@/utils/constants";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.register({ name, email, password });
      localStorage.setItem(ACCESS_TOKEN, data.token); // Store JWT token
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleRegister = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google`;
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleRegister} className="space-y-4">
        <h1 className="text-2xl font-bold">Register</h1>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="border p-2 w-full"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border p-2 w-full"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border p-2 w-full"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded inline-block w-full"
        >
          Register
        </button>
        <div className="w-full text-center text-gray-400">OR</div>
        <button
          type="button"
          onClick={handleGoogleRegister}
          className="bg-red-500 text-white px-4 py-2 rounded ml-2 inline-block w-full"
        >
          Login with Google
        </button>
      </form>
    </div>
  );
}
