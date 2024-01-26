import { useMutation } from 'react-query';
import { privateInstance } from '../../library/apis/axiosInstance';
interface IRandomMv {
  selectId: string;
  page: number;
}

export const useRandomMv = () => {
  const getRandomMv = async (data: IRandomMv) => {
    const { selectId, page } = data;
    // console.log(selectId);
    const response = await privateInstance.post(
      `/playlist/random-mv/?page=${page}`,
      {
        already_musiclist: selectId,
      },
    );
    return response.data;
  };
  const mutation = useMutation(getRandomMv);
  return mutation;
};
