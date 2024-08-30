import React from 'react';
import { Card } from "@tremor/react";
import StatCard from './StatCard';

const NewsletterCard = ({ newsletter }) => {
    return (
        <div className="flex flex-row">
            <div className="flex flex-row gap-3 w-full p-2">
                <Card className="p-4 flex-1">
                    <h2 className='text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold'>{newsletter.name}</h2>
                </Card>
                <StatCard
                    title="Subscribers"
                    value={newsletter.subscriptions.total_results}
                />
                <StatCard
                    title="Average Open Rate"
                    value={`${newsletter.averageOpenRate.toFixed(2)}%`}
                    percentageChange={newsletter.percentageChange}
                />
                <StatCard
                    title="Average CTR"
                    value={`${newsletter.averageClickRate.toFixed(2)}%`}
                    percentageChange={newsletter.percentageChangeClickRate}
                />
            </div>
        </div>
    );
};

export default NewsletterCard;