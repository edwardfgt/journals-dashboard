import NewsletterStats from './NewsletterStats';
import React, { useState, useEffect } from 'react';
import { Card, Title } from '@tremor/react';

const NewsletterHealth = () => {

  return (
    <div className="space-y-6">
      <Card>
        <NewsletterStats />
      </Card>
    </div>
  )
};

export default NewsletterHealth;