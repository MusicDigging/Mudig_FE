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
