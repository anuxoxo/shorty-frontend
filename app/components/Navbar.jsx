"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import userPlaceholderImage from "@/assets/user.png";
import { ACCESS_TOKEN } from "@/utils/constants";

const checkAuth = () => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  return token ? true : false;
};

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // Check auth status when component mounts
    const authStatus = checkAuth();
    setIsLoggedIn(authStatus);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link
            href="/"
            className="text-4xl italic font-extrabold text-indigo-500"
          >
            shorty
          </Link>

          {/* Nav Options */}
          <div className="flex items-center">
            {isLoggedIn ? (
              <>
                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center focus:outline-none"
                  >
                    <Image
                      src={userPlaceholderImage}
                      alt="Profile"
                      width={32}
                      height={32}
                      className="rounded-full border"
                    />
                  </button>
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                      {/* Profile Info */}
                      <div className="p-4 text-gray-700">
                        <p className="font-semibold">John Doe</p>
                        <p className="text-sm text-gray-500">
                          johndoe@mail.com
                        </p>
                      </div>
                      <hr />

                      {/* Dashboard Link */}
                      <Link
                        href="/dashboard"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Dashboard
                      </Link>

                      {/* Logout Button */}
                      <button
                        onClick={handleLogout}
                        className="block w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Login/Register Links */}
                <Link
                  href="/login"
                  className="text-gray-600 hover:text-blue-500 mr-4"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="text-gray-600 hover:text-blue-500"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
