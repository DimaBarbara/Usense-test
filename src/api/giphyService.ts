import axios from "axios";
import type { GiphyResponse } from "../types/giphy";

const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;
const BASE_URL = import.meta.env.VITE_GIPHY_BASE_URL;
const LIMIT = 20;

const giphyClient = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    limit: LIMIT,
    rating: 'g',
  },
});

giphyClient.interceptors.request.use((config) => {
  if (!API_KEY) {
    throw new Error('Giphy API Key is missing. Check your .env file.');
  }
  return config;
});

export const giphyService = {
  async searchGifs(query: string, page: number = 1, signal?: AbortSignal): Promise<GiphyResponse> {
    const offset = (page - 1) * LIMIT;
    
    const { data } = await giphyClient.get<GiphyResponse>('/search', {
      params: { q: query, offset },
      signal,
    });
    
    return data;
  },
  async getTrending(page: number = 1, signal?: AbortSignal): Promise<GiphyResponse> {
    const offset = (page - 1) * LIMIT;
    
    const { data } = await giphyClient.get<GiphyResponse>('/trending', {
      params: { offset },
      signal,
    });
    
    return data;
  }
};