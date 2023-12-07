import { useQuery } from 'react-query';
import { privateInstance } from '../../library/apis/axiosInstance';

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
