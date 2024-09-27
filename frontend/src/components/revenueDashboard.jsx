import React, { useState, useEffect } from 'react';
import { Card, Title, Metric } from '@tremor/react';
import TotalRevenueChart from './charts/totalRevenueChart';
import ClientRevenueBreakdownChart from './charts/ClientRevenueBreakdownChart';
import { fetchTotalRevenue, fetchClientRevenue, fetchNewsletterRevenue } from '../services/api';

const RevenueDashboard = () => {
  const [totalRevenue, setTotalRevenue] = useState(null);
  const [clientRevenue, setClientRevenue] = useState([]);
  const [newsletterRevenue, setNewsletterRevenue] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const totalRevenueData = await fetchTotalRevenue();
      const clientRevenueData = await fetchClientRevenue();
      const newsletterRevenueData = await fetchNewsletterRevenue();

      setTotalRevenue(totalRevenueData.totalRevenue);
      setClientRevenue(clientRevenueData);
      setNewsletterRevenue(newsletterRevenueData);
    };

    fetchData();
  }, []);

  if (!totalRevenue) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <Card>
        <Title>Total Revenue</Title>
        <Metric>${totalRevenue.toLocaleString()}</Metric>
      </Card>
      <TotalRevenueChart clientsData={clientRevenue} />

      {/* Breakdown of all clients revenue per income stream */}
      {Object.entries(newsletterRevenue).map(([newsletterName, data], index) => (
        <Card key={index}>
          <ClientRevenueBreakdownChart
            revenueData={data}
            title={`Revenue Breakdown - ${newsletterName}`}
          />
        </Card>
      ))}
    </div>
  );
};

export default RevenueDashboard;