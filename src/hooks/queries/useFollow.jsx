import { useMutation } from 'react-query';
import { privateInstance } from '../../library/apis/axiosInstance';

export const usePostFollow = () => {
  return useMutation((user_id) =>
    privateInstance.post(`/user/${user_id}/follow`),
  );
};

export const useDelFollow = () => {
  return useMutation((user_id) =>
    privateInstance.delete(`/user/${user_id}/unfollow`),
  );
};
