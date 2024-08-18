import axios from "axios";
import { useQuery } from '@tanstack/react-query';

const API_URL = "http://localhost:3000/api";

export const fetchTotalRevenue = async () => {
  const response = await axios.get(`${API_URL}/revenue/total-revenue`);
  return response.data;
};

export const fetchClientRevenue = async () => {
  const response = await axios.get(`${API_URL}/revenue/client-revenue`);
  return response.data;
};

export const fetchNewsletterRevenue = async () => {
  const response = await axios.get(`${API_URL}/revenue/newsletter-revenue`);
  return response.data;
};

export const fetchNewsletterStats = async () => {
  const response = await axios.get(`${API_URL}/beehiiv/stats`);
  return response.data;
};

export const useNewsletterStats = () => {
  return useQuery({
    queryKey: ['newsletterStats'],
    queryFn: fetchNewsletterStats,
  });
};