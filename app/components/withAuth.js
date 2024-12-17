// app/components/withAuth.js
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ACCESS_TOKEN } from "@/utils/constants";
import { useUser } from "@/context/userContext";

const withAuth = (Component) => {
  return function AuthHOC(props) {
    const [isClient, setIsClient] = useState(false); // To track if we're on the client
    const router = useRouter();
    const userCtx = useUser();

    useEffect(() => {
      setIsClient(true); // We are on the client side after the component has mounted
    }, []);

    useEffect(() => {
      if (isClient) {
        const token = localStorage.getItem(ACCESS_TOKEN);

        // If no token is found, redirect to login
        if (!token) {
          router.push("/login");
        } else {
          userCtx.fetchUser();
        }
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isClient, router]);

    // If we're on the client and the user is authenticated, render the component
    return isClient ? <Component {...props} /> : null;
  };
};

export default withAuth;
