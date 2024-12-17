import React from "react";

const UrlCard = ({ url, onDelete }) => {
  const handleDelete = () => {
    onDelete(url.shortUrl);
  };

  return (
    <div className="url-card">
      <div>
        <strong>Original URL:</strong>{" "}
        <a href={url.originalUrl} target="_blank" rel="noopener noreferrer">
          {url.originalUrl}
        </a>
      </div>
      <div>
        <strong>Short URL:</strong>{" "}
        <a
          href={`/${url.shortUrl}`}
          target="_blank"
          rel="noopener noreferrer"
        >{`/${url.shortUrl}`}</a>
      </div>
      <div>
        <strong>Click Count:</strong> {url.clickCount}
      </div>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default UrlCard;
