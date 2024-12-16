"use client"; // Ensure it's a client-side component

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GoogleCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const getTokenFromUrl = () => {
      // Extract token from URL query parameter
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");

      if (token) {
        // Store the token in sessionStorage or localStorage
        sessionStorage.setItem("token", token); // or localStorage.setItem("token", token)

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
