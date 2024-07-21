import React from 'react';
import { Card, Title, AreaChart } from '@tremor/react';

const ClientRevenueChart = ({ clientsData }) => {
  const dataFormatter = (number) => `$${Intl.NumberFormat('us').format(number).toString()}`;

  const clientNames = Object.keys(clientsData[0]).filter(key => key !== 'date');

  return (
    <Card>
      <Title>Client Revenue Comparison</Title>
      <AreaChart
        className="h-80 mt-4"
        data={clientsData}
        index="date"
        categories={clientNames}
        colors={["indigo", "rose", "amber", "emerald", "blue"]}
        valueFormatter={dataFormatter}
        yAxisWidth={60}
        onValueChange={(v) => console.log(v)}
      />
    </Card>
  );
};

export default ClientRevenueChart;