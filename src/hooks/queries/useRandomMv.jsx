import { useMutation } from 'react-query';
import { privateInstance } from '../../library/apis/axiosInstance';

export const useRandomMv = () => {
  const getRandomMv = async (id) => {
    const response = await privateInstance.post('/playlist/random-mv/', {
      already_musiclist: id,
    });
    return response.data;
  };
  const mutation = useMutation(getRandomMv);
  return mutation;
};
