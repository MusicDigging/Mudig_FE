import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  privateInstance,
  imgPrivateInstance,
} from '../../library/apis/axiosInstance';

export const useGetProfile = (user_id) => {
  const { data, isLoading, isFetching, isError, refetch } = useQuery(
    ['get-profile', user_id],
    () => {
      return privateInstance.get(`/user/profile/${user_id}/`);
    },
    {
      select: (response) => response.data,
    },
  );

  return { data, isLoading, isFetching, isError, refetch };
};

// useGetFollowing 훅
export const useGetFollowing = (user_id) => {
  const { data, isLoading, isError, refetch, isFetching } = useQuery(
    ['get-following', user_id], // user_id를 쿼리 키에 추가
    () => privateInstance.get(`/user/${user_id}/following/`),
    {
      select: (response) => response.data.following_list,
    },
  );
  return { data, isLoading, isError, refetch, isFetching };
};

// useGetFollower 훅
export const useGetFollower = (user_id) => {
  const { data, isLoading, isError, refetch, isFetching } = useQuery(
    ['get-follower', user_id], // user_id를 쿼리 키에 추가
    () => privateInstance.get(`/user/${user_id}/followers/`),
    {
      select: (response) => response.data.follower_list,
    },
  );
  return { data, isLoading, isError, refetch, isFetching };
};

export const useEditProfile = () => {
  const queryClient = useQueryClient();
  const editProfile = (data) => {
    const response = imgPrivateInstance.put('/user/profile/edit/', data);
    return response.data;
  };

  return useMutation(editProfile, {
    onSuccess: () => {
      queryClient.invalidateQueries('get-profile');
    },
  });
};

export const useLogout = () => {
  const postLogout = async () => {
    const response = await privateInstance.post('/user/logout/');
    console.log(response);
    return response;
  };

  return useMutation(postLogout);
};
