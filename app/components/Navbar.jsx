"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import userPlaceholderImage from "@/assets/user.png";
import { ACCESS_TOKEN } from "@/utils/constants";
import { useUser } from "@/context/userContext";
import Loader from "./Loader";
import { api, axiosInstance } from "@/utils/api";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, setUser, loading, fetchUser } = useUser();

  useEffect(() => {
    fetchUser();
  }, []);

  const router = useRouter();
  const menuRef = useRef(null);

  useEffect(() => {
    if (user?.email) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

  // Close the menu if clicked outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleLogout = async () => {
    setUserMenuOpen(false);
    setUser(null);

    await api.logout();
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
            className="rubik-bold-italic text-4xl italic font-extrabold bg-gradient-to-r from-purple-500 to-indigo-500 text-transparent bg-clip-text"
          >
            shorty
          </Link>

          {/* Nav Options */}
          <div className="flex items-center space-x-6">
            {isLoggedIn ? (
              loading ? (
                <Loader />
              ) : (
                <>
                  {/* User Menu */}
                  <div className="relative" ref={menuRef}>
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex items-center focus:outline-none"
                    >
                      <Image
                        src={user?.googlePhotoUrl || userPlaceholderImage}
                        alt="Profile"
                        width={40}
                        height={40}
                        className="rounded-full border border-gray-300 hover:border-purple-500"
                      />
                    </button>
                    {userMenuOpen && (
                      <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                        <div className="p-4 text-gray-700 flex flex-col gap-2 items-center">
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
                        <Link
                          href="/dashboard"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          Dashboard
                        </Link>
                        <hr />
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
              )
            ) : (
              <>
                {/* Login/Register Links */}
                <Link
                  href="/login"
                  className="relative group text-gray-600 hover:text-purple-600 font-medium transition duration-300"
                >
                  Login
                  <span className="absolute -bottom-1 left-0 w-0 h-1 bg-purple-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link
                  href="/register"
                  className="relative group text-gray-600 hover:text-purple-600 font-medium transition duration-300"
                >
                  Register
                  <span className="absolute -bottom-1 left-0 w-0 h-1 bg-purple-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
