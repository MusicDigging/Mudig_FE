import { useQuery, useMutation, useQueryClient } from 'react-query';
import { privateInstance } from '../../library/apis/axiosInstance';
interface CreatePlaylistReq {
  situations: string;
  genre: string;
  year: string;
}


export const useCreatePlaylist = () => {
  const createPlaylist = (data: CreatePlaylistReq) => {
    const response = privateInstance.post('/playlist/create/', data);
    return response;
  };

  const mutation = useMutation(createPlaylist);

  return mutation;
};

export const useGetPlaylistDetail = (id) => {
  const { data, isLoading, isError } = useQuery(
    'get-playlist-detail',
    () => {
      return privateInstance.get(`/playlist/detail/${id}/`);
    },
    {
      select: (response) => response.data,
    },
  );
  return { data, isLoading, isError };
};

//내 플리 조회
export const useMyPlayList = () => {
  const { data, isLoading } = useQuery(
    'get-my-playlist',
    () => {
      return privateInstance.get(`/playlist/myplaylist/`);
    },
    {
      select: (response) => response.data,
    },
  );
  return { data, isLoading };
};

export const usePutMyPlayList = () => {
  const putMyPlayList = async (data) => {
    const response = await privateInstance.put('/playlist/add/', {
      playlist_id: data.playlist_id,
      music: data.music, //랜덤뮤비 아이디 값은 문자열로!
    });

    return response.data;
  };

  const mutation = useMutation(putMyPlayList);
  return mutation;
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

export const useLikePlaylist = () => {
  const queryClient = useQueryClient();

  const likePlaylist = (data) => {
    const response = privateInstance.post('/playlist/like/', data);
    return response;
  };

  return useMutation((data) => likePlaylist(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('get-playlist-detail');
    },
  });
};

export const useDeletePlaylist = () => {
  const deletePlaylist = async (id) => {
    const response = await privateInstance.delete(`/playlist/delete/${id}`);
    return response;
  };

  return useMutation(deletePlaylist);
};
export const useModifyPlaylist = (id) => {
  const modifyPlaylist = (data) => {
    const response = privateInstance.put(`/playlist/detail/${id}/edit/`, data);
    return response;
  };
  const mutation = useMutation(modifyPlaylist);

  return mutation;
};
