import axios from "axios";
import { useQuery, useMutation } from '@tanstack/react-query';

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

export const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/login`, { username, password });
  return response.data;
};

export const useApiQuery = (queryKey, fetchFn) => {
  return useQuery({
    queryKey,
    queryFn: fetchFn,
  });
};

export const useMutationForPost = (mutationFn) => {
  return useMutation({
    mutationFn,
  });
};

export const useNewsletterStats = () => useApiQuery(['newsletterStats'], fetchNewsletterStats);
export const useTotalRevenue = () => useApiQuery(['totalRevenue'], fetchTotalRevenue);
export const useLogin = () => useMutationForPost(login);