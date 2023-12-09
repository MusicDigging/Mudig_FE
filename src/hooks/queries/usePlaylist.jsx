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

export const useGetPlaylistDetail = (id) => {
  const { data, isLoading } = useQuery(
    'get-playlist-detail',
    () => {
      return privateInstance.get(`/playlist/detail/${id}/`);
    },
    {
      select: (response) => response.data,
    },
  );
  return { data, isLoading };
};

export const useGetPlaylistMusic = (ids) => {
  const { data, isLoading } = useQuery(
    'get-playlist-music',
    () => {
      return privateInstance.get(`/playlist/music/`);
    },
    {
      select: (response) => {
        const data = response.data.music.filter((item) =>
          ids.includes(item.id),
        );
        return data;
      },
    },
  );
  return { data, isLoading };
};
