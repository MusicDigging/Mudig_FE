import { useQuery, useMutation, useQueryClient } from 'react-query';
import { privateInstance } from '../../library/apis/axiosInstance';

export const useCreatePlaylist = () => {
  const queryClient = useQueryClient();

  const createPlaylist = (data) => {
    const response = privateInstance.post('/playlist/create/', data);

    return response;
  };

  const mutation = useMutation(createPlaylist, {
    onSuccess: (response) => {
      console.log(response);
      queryClient.invalidateQueries(['create-playlist']);
      return response.data;
    },
    onError: (error) => {
      throw error;
    },
  });
  const isLoading = mutation.isLoading;

  return { ...mutation, isLoading, data: mutation.data?.data.playlist };
};
