import React from 'react';
import { Card, Title, BarChart, DonutChart, Metric } from '@tremor/react';
import ClientRevenueChart from './clientRevenueChart';
import RevenueStreamChart from './revenueStreamsChart';

import totalRevenueData from '../data/totalRevenueData.json';
import client1Data from '../data/client1Data.json'

const RevenueDashboard = () => {
  const combinedClientData = totalRevenueData.dates.map((date, index) => ({
    date,
    'Client A': totalRevenueData.clientA[index],
    'Client B': totalRevenueData.clientB[index],
    'Total': totalRevenueData.clientA[index] + totalRevenueData.clientB[index]
  }));

  return (
    <div className="space-y-6">
      <Card>
        <Title>Total Revenue</Title>
        <Metric>${totalRevenueData.totalRevenue.toLocaleString()}</Metric>
      </Card>

      <ClientRevenueChart clientsData={combinedClientData} />

      <Card>
        <Title>Client 1 Revenue</Title>
        <RevenueStreamChart revenueData={client1Data}/>
      </Card>

    </div>
  );
};

export default RevenueDashboard;