import React from 'react';
import { Card, Title, BarChart, DonutChart, Metric } from '@tremor/react';
import ClientRevenueChart from './clientRevenueChart';

import revenueData from '../data/revenueData.json';

const RevenueDashboard = () => {
  const combinedClientData = revenueData.dates.map((date, index) => ({
    date,
    'Client A': revenueData.clientA[index],
    'Client B': revenueData.clientB[index],
  }));

  return (
    <div className="space-y-6">
      <Card>
        <Title>Total Revenue</Title>
        <Metric>${revenueData.totalRevenue.toLocaleString()}</Metric>
      </Card>

      <ClientRevenueChart clientsData={combinedClientData} />

    </div>
  );
};

export default RevenueDashboard;