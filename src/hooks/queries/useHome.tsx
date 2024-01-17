import { useQuery } from 'react-query';
import { privateInstance } from '../../library/apis/axiosInstance';

const useGetHome = () => {
  const { data, isLoading, error } = useQuery('fetch-playlists', async () => {
    const response = await privateInstance.get('/playlist/');
    return response.data;
  });

  return { data, isLoading, error };
};

export default useGetHome;
