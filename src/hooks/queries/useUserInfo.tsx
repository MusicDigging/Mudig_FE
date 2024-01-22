import { useMutation } from 'react-query';
import {
  axiosInstance,
  privateInstance,
  imgPrivateInstance,
} from '../../library/apis/axiosInstance';

export const useOtpValid = () => {
  const postOtpValid = async (email: string) => {
    const response = await axiosInstance.post('/user/otp/', {
      email: email,
    });
    return response.data;
  };
  const mutation = useMutation(postOtpValid);
  return mutation;
};

//비밀번호 변경
interface IPasswordData {
  password: string;
  newPassword: string;
}
export const useChangePassword = () => {
  const changePassword = async (data: IPasswordData) => {
    const response = await privateInstance.put('/user/changepassword/', {
      old_password: data.password,
      new_password: data.newPassword,
    });

    return response.data;
  };
  const mutation = useMutation(changePassword);
  return mutation;
};

interface IUserProfileData {
  email: string;
  name: string;
  about?: string;
  genre: string;
  image?: string;
}

export const useUserProfile = () => {
  const postUserProfile = async (formData: IUserProfileData) => {
    // const { userType, formData } = userData;
    // const apiUrl = userType === 'social' ? '/user/socialjoin/' : '/user/join/';

    const response = await imgPrivateInstance.post('/user/join/', formData);
    return response.data;
  };

  const mutation = useMutation(postUserProfile);
  return mutation;
};

//회원탈퇴
export const useUserResign = () => {
  const userResign = async (password: string) => {
    const response = await privateInstance.delete('/user/withdrawal/', {
      data: { password: password },
    });
    return response.data;
  };
  const mutation = useMutation(userResign);
  return mutation;
};
