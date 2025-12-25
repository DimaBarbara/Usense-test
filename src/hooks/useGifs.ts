import { useState, useEffect } from 'react';
import { giphyService } from '../api/giphyService';
import type { GiphyData } from '../types/giphy';

interface UseGifsReturn {
  gifs: GiphyData[];
  loading: boolean;
  error: string | null;
  totalCount: number;
}

export const useGifs = (searchTerm: string, page: number): UseGifsReturn => {
  const [gifs, setGifs] = useState<GiphyData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);

  useEffect(() => {
    const controller = new AbortController();

    const fetchGifs = async () => {
      setLoading(true);
      setError(null);
      if (page === 1) setGifs([]);

      try {
        const response = searchTerm.trim() 
          ? await giphyService.searchGifs(searchTerm, page)
          : await giphyService.getTrending(page);
        
        setGifs(response.data);
        setTotalCount(response.pagination.total_count);
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== 'AbortError') {
          setError(err.message || 'Something went wrong');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchGifs();
    return () => controller.abort();
  }, [searchTerm, page]);

  return { gifs, loading, error, totalCount };
};