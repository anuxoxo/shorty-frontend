"use client"; // Ensure it's a client-side component

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ACCESS_TOKEN } from "@/utils/constants";
import { motion } from "framer-motion"; // For smooth animations

export default function GoogleCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const getTokenFromUrl = () => {
      // Extract token from URL query parameter
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");

      if (token) {
        localStorage.setItem(ACCESS_TOKEN, token);

        // Redirect the user to the dashboard or home page
        router.push("/dashboard");
      } else {
        // Handle error case if no token is found
        alert("Authentication failed. Please try again.");
        router.push("/login"); // Redirect to login if token is not found
      }
    };

    getTokenFromUrl();
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600">
      <motion.div
        className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96 lg:w-1/3 xl:w-1/4 text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="animate-pulse">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4">
            Redirecting...
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Please wait while we redirect you to your dashboard.
          </p>
        </div>
        <div className="mt-6">
          <div className="h-2 bg-indigo-600 rounded-full w-full"></div>
          <div className="mt-2 text-gray-500 text-sm sm:text-base">
            Loading...
          </div>
        </div>
      </motion.div>
    </div>
  );
}
