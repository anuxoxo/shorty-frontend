// context/UserContext.js
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { api } from "@/utils/api";

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

  useEffect(() => {
    fetchUser();
  }, []); // Runs once when the component mounts

  return (
    <UserContext.Provider value={{ user, loading, error, setUser, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
