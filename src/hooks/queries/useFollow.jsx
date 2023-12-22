import { useMutation, useQueryClient } from 'react-query';
import { privateInstance } from '../../library/apis/axiosInstance';

export const usePostFollow = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (user_id) => privateInstance.post(`/user/${user_id}/follow/`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('get-following');
      },
    },
  );
};

export const useDelFollow = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (user_id) => privateInstance.delete(`/user/${user_id}/unfollow/`),
    {
      onSuccess: () => {
        // 팔로잉 목록 쿼리 갱신
        queryClient.invalidateQueries('get-following');

        // 필요하다면, 팔로워 목록 쿼리도 갱신할 수 있습니다.
        // queryClient.invalidateQueries('get-follower');
      },
    },
  );
};
