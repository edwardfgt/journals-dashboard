import NewsletterStats from './NewsletterStats';
import React, { useState, useEffect } from 'react';
import { Card, Title, Metric } from '@tremor/react';

const NewsletterHealth = () => {
  
  return(
    <div className="space-y-6">
    <Card>
        <Title>HEALTH TEST</Title>
        <NewsletterStats/>
      </Card>
    </div>
  )
};

export default NewsletterHealth;