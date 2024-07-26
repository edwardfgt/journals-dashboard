import React, { useState, useEffect } from 'react';
import { fetchNewsletterStats } from '../services/api';
import { BadgeDelta, Card } from '@tremor/react';

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

  console.log(stats)

  return (
    <div>
      <h2>Newsletter Stats</h2>
      {stats.map((newsletter) => (
        <Card className="mx-auto max-w-sm">
        <div className="flex items-center justify-between">
          <h4 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">Subscribers</h4>
          <BadgeDelta
            deltaType="moderateIncrease"
            isIncreasePositive={true}
            size="xs"
          >
            +9.3%
          </BadgeDelta>
        </div>
        <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">{newsletter.data.total_results}</p>
      </Card>
  
      ))}
    </div>
  );
};

export default NewsletterStats;