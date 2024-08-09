import React, { useState, useEffect } from 'react';
import { fetchNewsletterStats } from '../services/api';
import { Card } from "@tremor/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

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
      {stats.map((newsletter) => (
        <div className="flex flex-row" key={newsletter.id}>
          <Card className="basis-full x-auto max-w-sm">
            <div className="flex items-center justify-between">
              <h2 className='text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold pr-4'>{newsletter.name}</h2>
              <div>
                <h4 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">Subscribers</h4>
                <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">{newsletter.subscriptions.total_results}</p>
              </div>
              <div>
                <h4 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">Average Open Rate</h4>
                <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">{newsletter.averageOpenRate.toFixed(2)}%</p>
                {newsletter.percentageChange !== null && (
                  <span
                    className={classNames(
                      newsletter.percentageChange >= 0
                        ? 'bg-emerald-100 text-emerald-800 ring-emerald-600/10 dark:bg-emerald-400/10 dark:text-emerald-500 dark:ring-emerald-400/20'
                        : 'bg-red-100 text-red-800 ring-red-600/10 dark:bg-red-400/10 dark:text-red-500 dark:ring-red-400/20',
                      'inline-flex items-center rounded-tremor-small px-2 py-1 text-tremor-label font-medium ring-1 ring-inset',
                    )}
                  >
                    {newsletter.percentageChange.toFixed(2)}%
                  </span>
                )}
              </div>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default NewsletterStats;