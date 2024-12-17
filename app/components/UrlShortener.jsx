import React, { useState } from "react";
import { api } from "@/utils/api";
import { toast } from "react-toastify";

const UrlShortener = ({ setUrls }) => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) {
      setError("Please enter a valid URL.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const { data } = await api.shortenUrl({ originalUrl: url });
      console.log(data);
      setUrls((prevUrls) => [data?.data, ...prevUrls]);
      setUrl("");
    } catch (err) {
      toast.error("Failed to shorten URL. Please try again.");
      setError("Failed to shorten URL. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-md mt-10">
      {/* Heading */}
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">
        URL Shortener
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Paste your long URL below and get a shorter version instantly.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter your link here..."
            className="w-full px-5 py-4 pt-5 text-lg text-gray-700 rounded-lg bg-gray-100 border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition placeholder-gray-500"
          />
          {/* Error Message */}
          {error && (
            <span className="absolute text-red-500 text-xs left-5 mt-1.5">
              {error}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 text-lg font-semibold text-white rounded-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-lg ${
            loading
              ? "bg-indigo-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading ? "Shortening..." : "Shorten URL"}
        </button>
      </form>
    </div>
  );
};

export default UrlShortener;
