import React from 'react';
import NewsletterStats from './NewsletterStats';
import GeneralStats from './GeneralStats';
import { useNewsletterStats } from '../../services/api';
import { Spin } from 'antd';

const NewsletterDashboard = () => {
  const { data: stats, isLoading, error } = useNewsletterStats();
  console.log(stats);

  const totalSubscribers = stats ? stats.reduce((sum, newsletter) => sum + newsletter.subscriptions.total_results, 0) : 0;
  const totalSends = stats ? stats.reduce((sum, newsletter) => sum + newsletter.totalSendsData.data.stats.total_sent, 0) : 0;

  if (isLoading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <Spin spinning={isLoading} size="large" />
    </div>
  );
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <GeneralStats totalSubscribers={totalSubscribers} totalSends={totalSends} />
      <NewsletterStats stats={stats} />
    </div>
  );
};

export default NewsletterDashboard;