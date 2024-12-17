"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { api } from "@/utils/api";
import { ACCESS_TOKEN } from "@/utils/constants"; // Make sure this constant matches your token key

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    try {
      const userData = await api.fetchUserDetails();
      setUser(userData?.data?.user);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const getToken = () => localStorage.getItem(ACCESS_TOKEN);

  useEffect(() => {
    const handleStorageChange = () => {
      const token = getToken();
      if (token) {
        fetchUser();
      } else {
        setUser(null);
      }
    };

    // Listen for changes in localStorage across tabs/windows
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, error, setUser, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
