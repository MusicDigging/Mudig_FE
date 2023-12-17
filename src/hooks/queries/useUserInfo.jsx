import { useMutation } from 'react-query';
import { privateInstance } from '../../library/apis/axiosInstance';

export const useChangePassword = () => {
  const changePassword = async (data) => {
    const response = await privateInstance.put('/user/changepassword/', {
      old_password: data.password,
      new_password: data.newPassword,
    });

    return response.data;
  };
  const mutation = useMutation(changePassword);
  return mutation;
};
