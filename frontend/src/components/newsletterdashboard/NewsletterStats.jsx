import React from 'react';
import { useNewsletterStats } from '../../services/api';
import NewsletterCard from './NewsletterCard';

const NewsletterStats = ({ stats }) => {

  return (
    <div>
      {stats.map((newsletter) => (
        <NewsletterCard key={newsletter.id} newsletter={newsletter} />
      ))}
    </div>
  );
};

export default NewsletterStats;