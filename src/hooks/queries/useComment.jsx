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
      console.log(res);
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
      console.log(res);
      queryClient.invalidateQueries('get-playlist-detail');
    },
  });
};
