"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  const navigateTo = (path) => {
    router.push(path);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4 text-blue-600">
        Welcome to Shorty
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        Your ultimate URL shortener solution. Login or register to get started!
      </p>
      <div className="space-x-4">
        <button
          onClick={() => navigateTo("/login")}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
        >
          Login
        </button>
        <button
          onClick={() => navigateTo("/register")}
          className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600"
        >
          Register
        </button>
      </div>
      <div className="mt-8">
        <p className="text-gray-500">
          Or learn more about our app features below.
        </p>
        <ul className="mt-4 space-y-2 text-gray-700">
          <li>🚀 Create and manage shortened URLs easily</li>
          <li>📊 Track statistics for your links</li>
          <li>🔒 Secure login with email/password or Google</li>
          <li>⚙️ Manage your account effortlessly</li>
        </ul>
      </div>
    </div>
  );
}
