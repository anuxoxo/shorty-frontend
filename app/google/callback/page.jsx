"use client"; // Ensure it's a client-side component

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ACCESS_TOKEN } from "@/utils/constants";

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
    <div className="flex justify-center items-center h-screen">
      <p>Redirecting...</p>
    </div>
  );
}
