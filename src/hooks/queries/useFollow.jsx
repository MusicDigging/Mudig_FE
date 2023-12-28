import { useMutation, useQueryClient } from 'react-query';
import { privateInstance } from '../../library/apis/axiosInstance';

// 팔로우 및 언팔로우 훅
const useFollowUser = () => {
  const queryClient = useQueryClient();

  const postFollow = useMutation(
    (userId) => privateInstance.post(`/user/${userId}/follow/`),
    {
      onSuccess: () => {
        // 팔로잉 목록 쿼리 갱신
        queryClient.invalidateQueries('get-following');
        queryClient.invalidateQueries('get-follower');
      },
    },
  );

  const delFollow = useMutation(
    (userId) => privateInstance.delete(`/user/${userId}/unfollow/`),
    {
      onSuccess: () => {
        // 팔로잉 목록 쿼리 갱신
        queryClient.invalidateQueries('get-following');
        queryClient.invalidateQueries('get-follower');
      },
    },
  );

  // 팔로우와 언팔로우를 처리하는 함수
  const followUser = (userId, isFollowing) => {
    // isFollowing 상태에 따라 적절한 액션을 선택
    const action = isFollowing ? delFollow.mutate : postFollow.mutate;
    action(userId);
  };

  return { followUser };
};

export default useFollowUser;
