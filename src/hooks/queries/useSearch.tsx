import { useQuery } from 'react-query';
import { privateInstance } from '../../library/apis/axiosInstance';

export const useSearch = (query) => {
  const { data, isLoading, refetch } = useQuery(
    'get-search',
    () => {
      return privateInstance.get(`/playlist/search/?query=${query}`);
    },
    { select: (response) => response.data },
  );
  return { data, isLoading, refetch };
};

export const useSearchMusic = (query) => {
  const { music } = useQuery(
    'get-search-music',
    () => {
      return privateInstance.get(`/playlist/searchmusic/?query=${query}`);
    },
    { select: (response) => response.data },
  );
  return { music };
};
