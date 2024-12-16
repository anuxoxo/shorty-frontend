'use client';
import { useEffect, useState } from 'react';
import { api } from '@/utils/api';

export default function TopUrls() {
  const [urls, setUrls] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTopUrls = async () => {
      try {
        const { data } = await api.getTopUrls();
        setUrls(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchTopUrls();
  }, []);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold">Top URLs</h2>
      <ul>
        {urls.map((url) => (
          <li key={url.id} className="py-2">
            {url.originalUrl} → {url.shortUrl} (Visits: {url.visits})
          </li>
        ))}
      </ul>
    </div>
  );
}
