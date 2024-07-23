import React from 'react';
import { Card, Title, BarChart, DonutChart, Metric } from '@tremor/react';
import TotalRevenueChart from './totalRevenueChart';
import ClientRevenueBreakdownChart from './ClientRevenueBreakdownChart';

import totalRevenueData from '../data/totalRevenueData.json';
import client1Data from '../data/client1Data.json'
import client2Data from '../data/client2Data.json'

const RevenueDashboard = () => {
  const combinedClientData = totalRevenueData.dates.map((date, index) => ({
    date,
    'Client A': totalRevenueData.clientA[index],
    'Client B': totalRevenueData.clientB[index],
    'Total': totalRevenueData.clientA[index] + totalRevenueData.clientB[index]
  }));

  const streamsDatasets = [
    { data: client1Data, title: "Newsletter 1" },
    { data: client2Data, title: "Newsletter 2" },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <Title>Total Revenue</Title>
        <Metric>${totalRevenueData.totalRevenue.toLocaleString()}</Metric>
      </Card>

      <TotalRevenueChart clientsData={combinedClientData} />


      {streamsDatasets.map((dataset, index) => (
        <Card>
        <ClientRevenueBreakdownChart 
          key={index}
          revenueData={dataset.data} 
          title={dataset.title}
        />
      </Card>
      ))}
    </div>
  );
};

export default RevenueDashboard;