"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import userPlaceholderImage from "@/assets/user.png";
import { ACCESS_TOKEN } from "@/utils/constants";
import { useUser } from "@/context/userContext";
import Loader from "./Loader";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, loading } = useUser();

  const router = useRouter();

  useEffect(() => {
    if (user?.email) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

  const handleLogout = () => {
    setUserMenuOpen(false);
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
            className="rubik-bold-italic s text-4xl italic font-extrabold text-indigo-500"
          >
            shorty
          </Link>

          {/* Nav Options */}
          <div className="flex items-center">
            {loading ? (
              <Loader />
            ) : isLoggedIn ? (
              <>
                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center focus:outline-none"
                  >
                    <Image
                      src={user?.googlePhotoUrl || userPlaceholderImage}
                      alt="Profile"
                      width={40}
                      height={40}
                      className="rounded-full border"
                    />
                  </button>
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                      {/* Profile Info */}
                      <div className="p-4 text-gray-700 flex flex-col gap-2 items-center flex-wrap justify-center">
                        <Image
                          src={user?.googlePhotoUrl || userPlaceholderImage}
                          alt="Profile"
                          width={72}
                          height={72}
                          className="rounded-full border"
                        />
                        <div className="text-center">
                          {user?.name && (
                            <p className="font-semibold">{user?.name}</p>
                          )}
                          <p className="text-sm text-gray-500">
                            {user?.email || "No email found"}
                          </p>
                        </div>
                      </div>
                      <hr />

                      {/* Dashboard Link */}
                      <Link
                        href="/dashboard"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Dashboard
                      </Link>
                      <hr />
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
