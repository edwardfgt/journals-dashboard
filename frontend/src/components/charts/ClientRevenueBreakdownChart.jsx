import React from 'react';
import { Card, Title, AreaChart } from '@tremor/react';
import PropTypes from 'prop-types';

const ClientRevenueBreakdownChart = ({ revenueData, title = "Revenue Stream Breakdown" }) => {
  const dataFormatter = (number) => `$${Intl.NumberFormat('us').format(number).toString()}`;
  const revenueStreams = Object.keys(revenueData[0]).filter(key => key !== 'date');

  return (
    <Card>
      <Title>{title}</Title>
      <AreaChart
        className="h-80 mt-4"
        data={revenueData}
        index="date"
        categories={revenueStreams}
        colors={["indigo", "rose", "amber", "emerald", "blue"]}
        valueFormatter={dataFormatter}
        yAxisWidth={60}
        onValueChange={(v) => console.log(v)}
        stack={true}
      />
    </Card>
  );
};

ClientRevenueBreakdownChart.propTypes = {
  revenueData: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string
};

export default ClientRevenueBreakdownChart;