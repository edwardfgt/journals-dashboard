import React from 'react';
import { Card, Metric, Text, Flex, Grid } from '@tremor/react';

const GeneralStats = ({ totalSubscribers }) => {
    const totalEmailsSent = 50000;

    return (
        <Grid numItems={1} numItemsSm={2} className="gap-4">
            <Card>
                <Flex flexDirection="col" alignItems="start">
                    <Text>Total Subscribers</Text>
                    <Metric>{totalSubscribers.toLocaleString()}</Metric>
                </Flex>
            </Card>
            <Card>
                <Flex flexDirection="col" alignItems="start">
                    <Text>Total Emails Sent</Text>
                    <Metric>{totalEmailsSent.toLocaleString()}</Metric>
                </Flex>
            </Card>
        </Grid>
    );
};

export default GeneralStats;
