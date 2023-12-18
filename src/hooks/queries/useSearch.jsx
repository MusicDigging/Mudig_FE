import { useQuery } from 'react-query';
import { privateInstance } from '../../library/apis/axiosInstance';

export const useSearch = (query) => {
  console.log('query: ', query);
  const { data, isLoading } = useQuery(
    'get-search',
    () => {
      return privateInstance.get(`/playlist/search/?query=${query}`);
    },
    { select: (response) => response.data },
  );
  console.log('data: ', data);
  return { data, isLoading };
};
