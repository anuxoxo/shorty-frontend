"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ACCESS_TOKEN } from "./utils/constants";
import { useUser } from "./context/userContext";

const accessToken = localStorage.getItem(ACCESS_TOKEN);

export default function HomePage() {
  const router = useRouter();
  const userCtx = useUser();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if the user is authenticated
  useEffect(() => {
    if (userCtx?.user?.email) {
      setIsAuthenticated(true);
    }
  }, []);

  const navigateTo = (path) => {
    router.push(path);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 text-white">
      <div className="max-w-4xl text-center p-12 rounded-lg shadow-xl bg-white bg-opacity-10 backdrop-blur-xl">
        <h1 className="text-5xl font-extrabold mb-6 tracking-tight">
          Welcome to Shorty
        </h1>
        <p className="text-lg mb-8 leading-relaxed">
          Your ultimate URL shortener solution.
        </p>

        {/* Auth Buttons */}
        <div className="space-x-6 mb-8">
          {isAuthenticated ? (
            <button
              onClick={() => navigateTo("/dashboard")}
              className="px-6 py-3 bg-indigo-700 text-white rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 hover:bg-indigo-800 focus:outline-none"
            >
              Dashboard
            </button>
          ) : (
            <>
              <button
                onClick={() => navigateTo("/login")}
                className="px-6 py-3 bg-indigo-700 text-white rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 hover:bg-indigo-800 focus:outline-none"
              >
                Get Started
              </button>
            </>
          )}
        </div>

        {/* Features Section */}
        <div className="mt-12 text-gray-200">
          <p className="text-gray-300 mb-6 text-lg">
            Here are some amazing features Shorty offers:
          </p>
          <ul className="space-y-3 text-lg">
            <li>🚀 Effortlessly create and manage shortened URLs</li>
            <li>📊 Monitor detailed statistics for your links</li>
            <li>🔒 Secure login with email/password or Google</li>
            <li>⚙️ Easily manage your account and settings</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
