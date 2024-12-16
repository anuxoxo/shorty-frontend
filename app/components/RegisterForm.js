"use client";
import { useState } from "react";
import { api } from "@/utils/api";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.register({ name, email, password });
      console.log("Registered successfully:", data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-4">
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
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Register
      </button>
    </form>
  );
}
