"use client";

import React, { useEffect, useState } from "react";
import { api } from "@/utils/api";
import { useRouter } from "next/navigation";
import UrlCard from "@/components/UrlCard";
import UrlShortener from "@/components/UrlShortener";

const DashboardPage = () => {
  const [urls, setUrls] = useState([]);
  const [statistics, setStatistics] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const { data } = await api.manageUrls();
        setUrls(data);
      } catch (error) {
        console.error("Error fetching URLs:", error);
      }
    };

    const fetchStatistics = async () => {
      try {
        const { data } = await api.getStatistics();
        setStatistics(data.statistics);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };

    fetchUrls();
    fetchStatistics();
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
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Your Dashboard</h1>
      {/* Include the URL Shortener form */}
      <UrlShortener setUrls={setUrls} />

      <h2>Your Shortened URLs</h2>
      <div className="url-list">
        {urls.length === 0 ? (
          <p>No URLs shortened yet.</p>
        ) : (
          urls.map((url) => <UrlCard key={url.shortUrl} url={url} />)
        )}
      </div>
      <h2>Statistics</h2>
      <div className="stats-list">
        {statistics.map((stat) => (
          <div key={stat.shortUrl}>
            <strong>{stat.originalUrl}</strong>: {stat.clickCount} clicks
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
