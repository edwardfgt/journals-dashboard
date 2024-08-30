import React from 'react';
import { Card } from "@tremor/react";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const StatCard = ({ title, value, percentageChange = null }) => {
    return (
        <Card className="p-4 flex-1">
            <h4 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">{title}</h4>
            <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">{value}</p>
            {percentageChange !== null && (
                <span
                    className={classNames(
                        percentageChange >= 0
                            ? 'bg-emerald-100 text-emerald-800 ring-emerald-600/10 dark:bg-emerald-400/10 dark:text-emerald-500 dark:ring-emerald-400/20'
                            : 'bg-red-100 text-red-800 ring-red-600/10 dark:bg-red-400/10 dark:text-red-500 dark:ring-red-400/20',
                        'inline-flex items-center rounded-tremor-small px-2 py-1 text-tremor-label font-medium ring-1 ring-inset mt-2',
                    )}
                >
                    {percentageChange.toFixed(2)}%
                </span>
            )}
        </Card>
    );
};

export default StatCard;