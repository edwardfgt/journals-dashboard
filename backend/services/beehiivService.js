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
    `https://api.beehiiv.com/v2/publications/${publication.id}/posts?status=confirmed&limit=21&order_by=publish_date&direction=desc`,
    {
      headers: { Authorization: `Bearer ${publication.token}` },
      data: { expand: ["stats"] }
    }
  );
  console.log("Fetched posts data:", response.data);
  return response.data.data; // Ensure this returns the array of posts
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

const fetchNewsletterData = async (publication) => {
  const [subscriptions, posts] = await Promise.all([
    fetchSubscriptions(publication),
    fetchRecentPosts(publication),
  ]);


  const { average, previousAverage, percentageChange } = calculateStats(posts);

  return {
    name: publication.name,
    id: publication.id,
    subscriptions,
    posts,
    averageOpenRate: average,
    previousAverageOpenRate: previousAverage,
    percentageChange,
  };
};

module.exports = { fetchNewsletterData };