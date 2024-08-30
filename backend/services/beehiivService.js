const axios = require("axios");

const fetchSubscriptions = async (publication) => {
  const response = await axios.get(
    `https://api.beehiiv.com/v2/publications/${publication.id}/subscriptions`,
    {
      headers: { Authorization: `Bearer ${publication.token}` },
      params: { status: "active" },
    }
  );
  return response.data;
};

const fetchRecentPosts = async (publication) => {
  const response = await axios.get(
    `https://api.beehiiv.com/v2/publications/${publication.id}/posts?status=confirmed&limit=100&order_by=publish_date&direction=desc`,
    {
      headers: { Authorization: `Bearer ${publication.token}` },
      data: { expand: ["stats"] }
    }
  );
  console.log("Fetched posts data:", response.data);
  return response.data.data;
};



const calculateAverage = (posts) => {
    const totalOpenRate = posts.reduce((sum, post) => sum + post.stats.email.open_rate, 0);
    return totalOpenRate / posts.length;
  };

const calculateStats = (posts) => {
  if (posts.length <= 1) {
    return { average: null, previousAverage: null, percentageChange: null };
  }

  const recentPosts = posts.slice(0, Math.min(posts.length, 11)); // Most recent 11 posts
  const olderPosts = posts.length > 11 ? posts.slice(11, 21) : []; // Previous 10 posts

  const average = calculateAverage(recentPosts);
  const previousAverage = olderPosts.length > 0 ? calculateAverage(olderPosts) : null;
  const percentageChange = previousAverage !== null ? ((average - previousAverage) / previousAverage) * 100 : null;

  return { average, previousAverage, percentageChange };
};

const calculateAverageClickRate = (posts) => {
    const totalClickRate = posts.reduce((sum, post) => sum + post.stats.email.click_rate, 0);
    return totalClickRate / posts.length;
  };
  
  const calculateClickRateStats = (posts) => {
    if (posts.length <= 1) {
      return { averageClickRate: null, previousAverageClickRate: null, percentageChangeClickRate: null };
    }
  
    const recentPosts = posts.slice(0, Math.min(posts.length, 11)); // Most recent 11 posts
    const olderPosts = posts.length > 11 ? posts.slice(11, 21) : []; // Previous 10 posts
  
    const averageClickRate = calculateAverageClickRate(recentPosts);
    const previousAverageClickRate = olderPosts.length > 0 ? calculateAverageClickRate(olderPosts) : null;
    const percentageChangeClickRate = previousAverageClickRate !== null ? ((averageClickRate - previousAverageClickRate) / previousAverageClickRate) * 100 : null;
  
    return { averageClickRate, previousAverageClickRate, percentageChangeClickRate };
  };

const calculateTotalSends = (posts) => {
  return posts.reduce((total, post) => total + post.stats.email.recipients, 0);
};

const fetchNewsletterData = async (publication) => {
  const [subscriptions, posts] = await Promise.all([
    fetchSubscriptions(publication),
    fetchRecentPosts(publication),
  ]);

  const { average, previousAverage, percentageChange } = calculateStats(posts);
  const { averageClickRate, previousAverageClickRate, percentageChangeClickRate } = calculateClickRateStats(posts);
  const totalSends = calculateTotalSends(posts);

  return {
    name: publication.name,
    id: publication.id,
    subscriptions,
    posts,
    averageOpenRate: average,
    previousAverageOpenRate: previousAverage,
    percentageChange,
    averageClickRate,
    previousAverageClickRate,
    percentageChangeClickRate,
    totalSends,
  };
};

module.exports = { fetchNewsletterData };