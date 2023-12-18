import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  privateInstance,
  imgPrivateInstance,
} from '../../library/apis/axiosInstance';

export const useGetProfile = (user_id) => {
  const { data, isLoading } = useQuery(
    'get-profile',
    () => {
      return privateInstance.get(`/user/profile/${user_id}/`);
    },
    {
      select: (response) => response.data,
    },
  );
  return { data, isLoading };
};

export const useGetFollowing = (user_id) => {
  const { data, isLoading } = useQuery(
    'get-following',
    () => {
      return privateInstance.get(`/user/${user_id}/following/`);
    },
    {
      select: (response) => response.data.following_list,
    },
  );
  return { data, isLoading };
};
export const useGetFollower = (user_id) => {
  const { data, isLoading } = useQuery(
    'get-follower',
    () => {
      return privateInstance.get(`/user/${user_id}/followers/`);
    },
    {
      select: (response) => response.data.follower_list,
    },
  );
  return { data, isLoading };
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
