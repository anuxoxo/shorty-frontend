"use client";
import { useState } from "react";
import { api } from "@/utils/api"; // Make sure the path is correct
import { toast } from "react-toastify"; // Optional: For showing success/error messages

const UrlShortener = ({ setUrls }) => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear any previous toast messages
    toast.dismiss();

    // Check if URL is empty
    if (!originalUrl) {
      toast.error("Please enter a URL.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.shortenUrl({ originalUrl });
      const newUrl = response.data;

      // Optionally, update the UI with the new shortened URL
      setUrls((prevUrls) => [newUrl, ...prevUrls]);

      toast.success("URL shortened successfully!");
      setOriginalUrl(""); // Clear input field after success
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="url-shortener">
      <h2>Shorten Your URL</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          placeholder="Enter URL to shorten"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Shortening..." : "Shorten URL"}
        </button>
      </form>
    </div>
  );
};

export default UrlShortener;
