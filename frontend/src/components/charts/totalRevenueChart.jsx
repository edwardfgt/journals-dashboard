import React from 'react';
import { Card, Title, AreaChart } from '@tremor/react';

const TotalRevenueChart = ({ clientsData }) => {
  const dataFormatter = (number) => `$${Intl.NumberFormat('us').format(number).toString()}`;
  
  // Filter out 'Total' from the categories
  const clientNames = Object.keys(clientsData[0]).filter(key => key !== 'date' && key !== 'Total');

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
        showLegend={true}
        showTooltip={true}
        showGridLines={true}
        curveType="monotone"
        stack="true"
      />
    </Card>
  );
};

export default TotalRevenueChart;