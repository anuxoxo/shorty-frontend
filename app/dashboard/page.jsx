"use client";

import React, { useEffect, useState } from "react";
import { api } from "@/utils/api";
import UrlCard from "@/components/UrlCard";
import UrlShortener from "@/components/UrlShortener";
import { FaLink } from "react-icons/fa"; // Import for a visual icon (optional)
import { toast } from "react-toastify";

const DashboardPage = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const { data } = await api.manageUrls();
        if (Array.isArray(data?.data)) {
          setUrls(data?.data);
        } else {
          setUrls([]);
        }
      } catch (error) {
        console.error("Error fetching URLs:", error);
        toast.error("Error fetching URLs!");
        setUrls([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUrls();
  }, []);

  const handleDelete = async (shortUrl) => {
    try {
      await api.deleteUrl(shortUrl);
      toast.success("Deletion Successful!");
      setUrls((prevUrls) =>
        prevUrls.filter((url) => url.shortUrl !== shortUrl)
      );
    } catch (error) {
      console.error("Error deleting URL:", error);
      toast.error("Error deleting URL!");
    }
  };

  const handleUpdate = async (shortUrl, newOriginalUrl, callback) => {
    try {
      await api.editUrl(shortUrl, {
        originalUrl: newOriginalUrl,
      });
      callback();
      toast.success("Updated Successfully!");
    } catch (error) {
      console.error(
        "Error updating URL:",
        error.response ? error.response.data : error
      );
      toast.error("Error updating URL");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          <span className="mt-4 text-lg font-medium text-gray-600">
            Loading your dashboard...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600">
      <div className="max-w-7xl  mx-auto px-6 py-40">
        {/* URL Shortener Form */}
        <div className="mb-8">
          <UrlShortener setUrls={setUrls} />
        </div>
      </div>

      {/* URL List Section */}
      <div className="bg-slate-100 w-full">
        <section className="mt-6 max-w-7xl py-48 pt-32 mx-auto">
          <h2 className="roboto-light inline-block text-3xl font-semibold text-gray-600 mb-6 text-center border-b-2 border-purple-500 pb-1">
            Your Shortened Links
          </h2>

          {urls.length === 0 ? (
            <div className="flex flex-col items-center justify-center mt-12 p-20 rounded border-2">
              <FaLink className="text-6xl text-gray-400 mb-4" />
              <p className="text-xl text-gray-500 mb-2">
                You haven't shortened any URLs yet.
              </p>
              <p className="text-sm text-gray-400">
                Start by using the form above to shorten your first link!
              </p>
            </div>
          ) : (
            <div>
              {urls?.map((url) => (
                <UrlCard
                  key={url?.shortUrl}
                  url={url}
                  onDelete={handleDelete}
                  onUpdate={handleUpdate}
                  className="transition-transform transform hover:scale-105 shadow-lg rounded-lg bg-white p-6"
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;
