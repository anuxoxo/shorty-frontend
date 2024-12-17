import React, { useState } from "react";
import { FaCheck, FaCopy, FaTrash, FaLink } from "react-icons/fa";

const UrlCard = ({ url, onDelete }) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleDelete = () => {
    onDelete(url.shortUrl);
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(window.location.origin + `/${url.shortUrl}`)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000); // Reset after 2 seconds
      })
      .catch(() => {
        setCopySuccess(false);
      });
  };

  return (
    <div className="flex flex-col p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 mb-6 max-w-4xl w-full">
      {/* Original URL */}
      <div className="mb-4 flex items-center gap-2">
        <FaLink className="text-indigo-600" size={20} />
        <div className="font-semibold text-gray-800 text-sm">
          <a href={url.originalUrl} target="_blank" rel="noopener noreferrer">
            {url.originalUrl}
          </a>{" "}
        </div>
      </div>

      {/* Short URL */}
      <div className="mb-4 flex justify-between items-center">
        <button
          onClick={handleCopy}
          className="flex gap-3 items-center justify-between bg-gray-100 rounded-lg p-4 shadow-inner transition-shadow duration-200"
        >
          <a
            href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/url/${url.shortUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 text-sm font-medium"
          >
            {`${process.env.NEXT_PUBLIC_API_BASE_URL}/url/${url.shortUrl}`}
          </a>
          <div
            className="hover:text-gray-500 transition duration-200"
            title="Copy to Clipboard"
          >
            {copySuccess ? (
              <FaCheck className="text-green-400" size={18} />
            ) : (
              <FaCopy size={18} />
            )}
          </div>
        </button>
        <button
          onClick={handleDelete}
          className="text-red-500 hover:text-red-700 transition duration-200"
          title="Delete URL"
        >
          <FaTrash size={20} />
        </button>
      </div>

      {/* Click Count */}
      {/* <div className="mb-4">
        <div className="font-semibold text-gray-800 text-sm">Total Views</div>
        <span className="text-gray-600">{url.clickCount}</span>
      </div> */}

      {/* Delete Button */}
      <div className="flex justify-end"></div>
    </div>
  );
};

export default UrlCard;
