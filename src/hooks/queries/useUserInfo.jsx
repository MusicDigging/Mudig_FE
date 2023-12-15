import { useMutation } from 'react-query';
import { privateInstance } from '../../library/apis/axiosInstance';

//비밀번호 변경
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

//회원탈퇴
export const useUserResign = () => {
  const userResign = async (password) => {
    const response = await privateInstance.delete('/user/withdrawal/', {
      data: { password: password },
    });
    return response.data;
  };
  const mutation = useMutation(userResign);
  return mutation;
};
