import React from 'react';
import { useNewsletterStats } from '../../services/api';
import NewsletterCard from './NewsletterCard';

const NewsletterStats = () => {
  const { data: stats, isLoading, error } = useNewsletterStats();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {stats.map((newsletter) => (
        <NewsletterCard key={newsletter.id} newsletter={newsletter} />
      ))}
    </div>
  );
};

export default NewsletterStats;