const axios = require("axios");

const fetchTotalSends = async (publication) => {
  const response = await axios.get(
    `https://api.beehiiv.com/v2/publications/${publication.id}`,
    {
      headers: { Authorization: `Bearer ${publication.token}` },
      params: { expand: ["stat_total_sent"] }
    }
  );
  return response.data;
};

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
    `https://api.beehiiv.com/v2/publications/${publication.id}/posts?status=confirmed&limit=22&order_by=publish_date&direction=desc`,
    {
      headers: { Authorization: `Bearer ${publication.token}` },
      data: { expand: ["stats"] }
    }
  );
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


const fetchNewsletterData = async (publication) => {
  const [subscriptions, posts, totalSendsData] = await Promise.all([
    fetchSubscriptions(publication),
    fetchRecentPosts(publication),
    fetchTotalSends(publication),
  ]);

  const { average, previousAverage, percentageChange } = calculateStats(posts);
  const { averageClickRate, previousAverageClickRate, percentageChangeClickRate } = calculateClickRateStats(posts);

  return {
    name: publication.name,
    id: publication.id,
    subscriptions,
    posts,
    averageOpenRate: average || null,
    previousAverageOpenRate: previousAverage || null,
    percentageChange: percentageChange || null,
    averageClickRate: averageClickRate || null,
    previousAverageClickRate: previousAverageClickRate || null,
    percentageChangeClickRate: percentageChangeClickRate || null,
    totalSendsData
  };
};

module.exports = { fetchNewsletterData };