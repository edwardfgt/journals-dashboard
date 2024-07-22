import React from 'react';
import { Card, Title, AreaChart } from '@tremor/react';

const RevenueStreamChart = ({ revenueData }) => {
  const dataFormatter = (number) => `$${Intl.NumberFormat('us').format(number).toString()}`;
  const revenueStreams = Object.keys(revenueData[0]).filter(key => key !== 'date');

  return (
    <Card>
      <Title>Revenue Stream Breakdown</Title>
      <AreaChart
        className="h-80 mt-4"
        data={revenueData}
        index="date"
        categories={revenueStreams}
        colors={["indigo", "rose", "amber", "emerald", "blue"]}
        valueFormatter={dataFormatter}
        yAxisWidth={60}
        onValueChange={(v) => console.log(v)}
      />
    </Card>
  );
};

export default RevenueStreamChart;