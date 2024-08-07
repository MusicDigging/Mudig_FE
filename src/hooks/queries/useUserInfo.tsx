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
interface IPassword {
  password: string;
  newPassword: string;
}
export const useChangePassword = () => {
  const changePassword = async (data: IPassword) => {
    const response = await privateInstance.put('/user/changepassword/', {
      old_password: data.password,
      new_password: data.newPassword,
    });

    return response.data;
  };
  const mutation = useMutation(changePassword);
  return mutation;
};

interface IuserData {
  formData: FormData;
  userType: string;
}

export const useUserProfile = () => {
  const postUserProfile = async (userData: IuserData) => {
    console.log(userData);
    const { userType, formData } = userData;

    const apiUrl = userType === 'social' ? '/user/socialjoin/' : '/user/join/';

    const response = await imgPrivateInstance.post(apiUrl, formData);
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

export const useEmailValid = () => {
  const emailValid = async (email: string) => {
    console.log(email);
    const response = await axiosInstance.post('/user/findemail/', {
      email: email,
    });

    return response.data;
  };
  const mutation = useMutation(emailValid);
  return mutation;
};

export const useFindPassword = () => {
  const findPassword = async (email: string) => {
    console.log(email);
    const response = await axiosInstance.post('/user/find_pw/', {
      email: email,
    });

    return response.data;
  };
  const mutation = useMutation(findPassword);
  return mutation;
};

export const useSetNewPassword = () => {
  const setNewPassword = async (password: string) => {
    console.log(password);
    const response = await privateInstance.put('/user/pwchange/', {
      new_password: password,
    });
    return response.data;
  };
  const mutation = useMutation(setNewPassword);
  return mutation;
};
