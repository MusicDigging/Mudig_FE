import { axiosInstance } from './axiosInstance';

export const loginUser = async (data) => {
  const response = await axiosInstance.post('/user/login/', {
    email: data.email,
    password: data.password,
  });

  return response.data;
};
