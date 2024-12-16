"use client";
import { useState } from "react";
import { api } from "@/utils/api";

export default function ShortenForm() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  const handleShorten = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.shortenUrl({ originalUrl });
      setShortUrl(data.shortUrl);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleShorten} className="space-y-4">
      <input
        type="url"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
        placeholder="Enter URL"
        className="border p-2 w-full"
      />
      {shortUrl && <p className="text-green-500">Short URL: {shortUrl}</p>}
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        className="bg-purple-500 text-white px-4 py-2 rounded"
      >
        Shorten URL
      </button>
    </form>
  );
}
