"use client";

import React, { useEffect, useState } from "react";
import { api } from "@/utils/api";
import UrlCard from "@/components/UrlCard";
import UrlShortener from "@/components/UrlShortener";
import { useUser } from "@/context/userContext";

const DashboardPage = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const userCtx = useUser();

  // useEffect(() => {
  //   userCtx.fetchUser();
  // }, []);

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const { data } = await api.manageUrls();
        setUrls(data);
      } catch (error) {
        console.error("Error fetching URLs:", error);
      }
    };

    // fetchUrls();
    setLoading(false);
  }, []);

  const handleDelete = async (shortUrl) => {
    try {
      await api.deleteUrl(shortUrl);
      setUrls(urls.filter((url) => url.shortUrl !== shortUrl));
    } catch (error) {
      console.error("Error deleting URL:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-xl font-semibold text-gray-700">Loading...</span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Your Dashboard
      </h1>

      {/* URL Shortener Form */}
      {/* <UrlShortener setUrls={setUrls} />

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
          Your Shortened URLs
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {urls.length === 0 ? (
            <p className="text-center text-gray-600">
              No URLs shortened yet. Start by shortening some!
            </p>
          ) : (
            urls.map((url) => (
              <UrlCard
                key={url.shortUrl}
                url={url}
                handleDelete={handleDelete}
              />
            ))
          )}
        </div>
      </section> */}
    </div>
  );
};

export default DashboardPage;
