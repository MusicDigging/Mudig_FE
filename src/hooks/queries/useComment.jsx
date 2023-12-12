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

  const editReply = (data) => {
    const response = privateInstance.put('/playlist/comment/edit/', data);
    return response;
  };

  return useMutation(editReply, {
    onSuccess: (res) => {
      queryClient.invalidateQueries('get-playlist-detail');
    },
  });
};
