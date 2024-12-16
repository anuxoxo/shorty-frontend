"use client";

import { useEffect, useState } from "react";
import { api } from "@/utils/api";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
        }
        const { data } = await api.getUserDetails(token);
        setUser(data);
      } catch (err) {
        console.error(err);
        router.push("/login");
      }
    };

    fetchUser();
  }, [router]);

  return (
    <div>
      <h1>Welcome to your Dashboard</h1>
      {user && (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <img src={user.googlePhoto} alt="Profile" />
        </div>
      )}
    </div>
  );
}
