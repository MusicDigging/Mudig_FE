import { axiosInstance } from './axiosInstance';

export const loginUser = async (data) => {
  const response = await axiosInstance.post('/user/login/', {
    email: data.email,
    password: data.password,
  });

  return response.data;
};

export const getKakaoInfo = async () => {
  try {
    const response = await axiosInstance.get('/user/login/kakao');
    // console.log(response.data);
    return response.data;
  } catch (error) {
    // console.log(error);
  }
};

export const postUserCode = async (code, social) => {
  try {
    const response = await axiosInstance.post(
      `/user/login/${social}/callback/`,

      {
        code: code,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data;
  } catch (error) {
    //   console.log(error);
  }
};

export const getGoogleInfo = async () => {
  try {
    const response = await axiosInstance.get('/user/login/google/');
    return response.data;
  } catch (error) {
    // console.log(error);
  }
};
