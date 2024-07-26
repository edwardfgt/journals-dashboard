import React, { useState, useEffect } from 'react';
import { fetchNewsletterStats } from '../services/api';

const NewsletterStats = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getStats = async () => {
      try {
        const data = await fetchNewsletterStats();
        setStats(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch newsletter stats');
        setLoading(false);
      }
    };

    getStats();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Newsletter Stats</h2>
      {stats.map((newsletter) => (
        <div key={newsletter.id}>
          <h3>Newsletter ID: {newsletter.id}</h3>
          <pre>{JSON.stringify(newsletter.data, null, 2)}</pre>
        </div>
      ))}
    </div>
  );
};

export default NewsletterStats;