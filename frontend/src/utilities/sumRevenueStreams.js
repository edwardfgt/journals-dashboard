const sumRevenueStreams = (clientData) => {
  return clientData.map((entry) => {
    const total = Object.keys(entry)
      .filter((key) => key !== "date")
      .reduce((sum, key) => sum + entry[key], 0);
    return { date: entry.date, total };
  });
};

export default sumRevenueStreams;
