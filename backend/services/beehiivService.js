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
    `https://api.beehiiv.com/v2/publications/${publication.id}/posts`,
    {
      headers: { Authorization: `Bearer ${publication.token}` },
    }
  );
  return response.data;
};

const fetchNewsletterData = async (publication) => {
  const [subscriptions, posts] = await Promise.all([
    fetchSubscriptions(publication),
    fetchRecentPosts(publication),
  ]);

  return {
    name: publication.name,
    id: publication.id,
    subscriptions,
    posts,
  };
};

module.exports = { fetchNewsletterData };
