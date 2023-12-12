import { useQuery, useMutation, useQueryClient } from 'react-query';
import { privateInstance } from '../../library/apis/axiosInstance';

export const useWriteComment = () => {
  const queryClient = useQueryClient();

  const writeComment = (data) => {
    const response = privateInstance.post('/playlist/comment/write/', data);
    return response;
  };

  return useMutation(writeComment, {
    onSuccess: (res) => {
      queryClient.invalidateQueries('get-playlist-detail');
    },
  });
};

export const useWriteReply = () => {
  const queryClient = useQueryClient();

  const writeReply = (data) => {
    const response = privateInstance.post('/playlist/recomment/write/', data);
    return response;
  };

  return useMutation(writeReply, {
    onSuccess: (res) => {
      queryClient.invalidateQueries('get-playlist-detail');
    },
  });
};

export const useEditComment = () => {
  const queryClient = useQueryClient();

  const editComment = (data) => {
    const response = privateInstance.put('/playlist/comment/edit/', data);
    return response;
  };

  return useMutation(editComment, {
    onSuccess: (res) => {
      queryClient.invalidateQueries('get-playlist-detail');
    },
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  const deleteComment = (id) => {
    const response = privateInstance.delete(`/playlist/comment/delete/${id}`);
    return response;
  };

  return useMutation(deleteComment, {
    onSuccess: (res) => {
      queryClient.invalidateQueries('get-playlist-detail');
    },
  });
};
