import React, { useState } from "react";
import { api } from "@/utils/api";

const UrlShortener = ({ setUrls }) => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) {
      setError("Please enter a valid URL");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const { data } = await api.shortenUrl({ originalUrl: url });
      setUrls((prevUrls) => [data, ...prevUrls]);
      setUrl("");
    } catch (err) {
      setError("Failed to shorten URL. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-10 rounded-2xl shadow-xl mt-12 space-y-6">
      <h2 className="text-4xl font-extrabold text-white text-center mb-6">
        Shorten Your URL
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter your URL here"
            className="w-full p-5 text-lg rounded-lg bg-white border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 placeholder-gray-500"
          />
          {error && (
            <span className="absolute text-red-500 text-sm left-0 bottom-[-24px]">
              {error}
            </span>
          )}
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 text-lg text-white font-semibold rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-700 hover:bg-indigo-800"
            }`}
          >
            {loading ? "Shortening..." : "Shorten URL"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UrlShortener;
