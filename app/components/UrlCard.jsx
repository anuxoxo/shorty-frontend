import React, { useState } from "react";
import {
  FaCheck,
  FaCopy,
  FaTrash,
  FaLink,
  FaEye,
  FaEdit,
} from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert"; // Import the confirmation library
import "react-confirm-alert/src/react-confirm-alert.css"; // Import styles for the modal

const UrlCard = ({ url, onDelete, onUpdate }) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newUrl, setNewUrl] = useState(url.originalUrl);
  const [originalUrl, setOriginalUrl] = useState(url.originalUrl);
  const shortUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/url/${url.shortUrl}`;

  const handleDelete = () => {
    confirmAlert({
      title: "Confirm Deletion",
      message: "Are you sure you want to delete this URL?",
      buttons: [
        {
          label: "Yes",
          onClick: () => onDelete(url.shortUrl),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(shortUrl)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000); // Reset after 2 seconds
      })
      .catch(() => {
        setCopySuccess(false);
      });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (newUrl) {
      onUpdate(url.shortUrl, newUrl, () => {
        setOriginalUrl(newUrl);
      });
    }
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setNewUrl(e.target.value);
  };

  return (
    <div className="flex flex-col p-6 bg-white rounded-xl mb-6 w-full gap-4 shadow-md border-4 border-transparent bg-clip-border border-t-4 border-l-4 border-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      {/* Original URL */}
      <div className="mb-4 flex items-center gap-2 w-full">
        <FaLink className="text-indigo-600" size={20} />
        <div className="font-semibold text-gray-800 text-sm w-full">
          <div className="flex gap-2 items-center">
            {isEditing ? (
              <input
                type="url"
                value={newUrl}
                onChange={handleChange}
                className="text-gray-800 text-sm w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            ) : (
              <a href={originalUrl} target="_blank" rel="noopener noreferrer">
                {originalUrl}
              </a>
            )}
            {/* Edit and Save Buttons */}
            <div className="flex justify-between items-center gap-4">
              {isEditing ? (
                <button
                  onClick={handleSave}
                  className="text-green-500 hover:text-green-700 transition duration-200"
                  title="Save Changes"
                >
                  <FaCheck size={18} />
                </button>
              ) : (
                <button
                  onClick={handleEdit}
                  className="text-gray-400 hover:text-indigo-700 transition duration-200"
                  title="Edit URL"
                >
                  <FaEdit size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Short URL */}
      <div className="mb-4 flex justify-between items-center gap-4">
        <button
          onClick={handleCopy}
          className="flex w-full gap-3 items-center justify-between bg-slate-100 hover:bg-slate-200 rounded-lg p-4 shadow-inner transition-shadow duration-200"
        >
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 text-sm font-medium hover:text-indigo-700 hover:font-bold"
          >
            {shortUrl}
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
      <div className="mb-4">
        <div className="text-gray-400 text-sm flex gap-2 items-center justify-center font-bold">
          <FaEye size={18} />
          Total Views: {url.clickCount || 0}
        </div>
      </div>
    </div>
  );
};

export default UrlCard;
