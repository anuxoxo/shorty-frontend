// app/top-urls/page.jsx

"use client";

import React, { useEffect, useState } from "react";
import { getTopUrls } from "@/utils/api";

const TopUrlsPage = () => {
  const [topUrls, setTopUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopUrls = async () => {
      try {
        const { data } = await getTopUrls();
        setTopUrls(data.topUrls);
      } catch (error) {
        console.error("Error fetching top URLs:", error);
      }
    };

    fetchTopUrls();
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Top 10 Most Clicked URLs</h1>
      <div>
        {topUrls.map((url) => (
          <div key={url.shortUrl}>
            <strong>{url.originalUrl}</strong>: {url.clickCount} clicks
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopUrlsPage;
