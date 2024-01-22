import { useMutation, useQueryClient } from 'react-query';
import { privateInstance } from '../../library/apis/axiosInstance';

interface CommentReq {
  content: string;
  playlist_id?: number;
  parent_id?: number;
  comment_id?: number;
}

export const useWriteComment = () => {
  const queryClient = useQueryClient();

  const writeComment = (data: CommentReq) => {
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

  const writeReply = (data: CommentReq) => {
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

  const editComment = (data: CommentReq) => {
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

  const deleteComment = (id: number) => {
    const response = privateInstance.delete(`/playlist/comment/delete/${id}`);
    return response;
  };

  return useMutation(deleteComment, {
    onSuccess: (res) => {
      queryClient.invalidateQueries('get-playlist-detail');
    },
  });
};
