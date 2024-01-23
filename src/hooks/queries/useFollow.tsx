import { useMutation, useQueryClient } from 'react-query';
import { privateInstance } from '../../library/apis/axiosInstance';

// useFollowUser 훅의 TypeScript 변환
const useFollowUser = () => {
  const queryClient = useQueryClient();

  // userId 타입을 string 혹은 number로 가정
  const postFollow = useMutation(
    (userId: string) => privateInstance.post(`/user/${userId}/follow/`),
    {
      onSuccess: () => {
        // 팔로잉 목록 쿼리 갱신
        queryClient.invalidateQueries('get-following');
        queryClient.invalidateQueries('get-follower');
        queryClient.invalidateQueries('get-profile');
      },
    },
  );

  const delFollow = useMutation(
    (userId: string) => privateInstance.delete(`/user/${userId}/unfollow/`),
    {
      onSuccess: () => {
        // 팔로잉 목록 쿼리 갱신
        queryClient.invalidateQueries('get-following');
        queryClient.invalidateQueries('get-follower');
        queryClient.invalidateQueries('get-profile');
      },
    },
  );

  // followUser 함수에 타입 지정
  const followUser = (userId: string, isFollowing: boolean) => {
    const action = isFollowing ? delFollow.mutate : postFollow.mutate;
    action(userId);
  };

  return { followUser };
};

export default useFollowUser;
