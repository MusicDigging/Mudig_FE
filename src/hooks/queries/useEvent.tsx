// useCreateEvent 훅 정의
import { useMutation, UseMutationOptions } from 'react-query';
import { privateInstance } from '../../library/apis/axiosInstance';

interface EventResponse {
  playlist: {
    id: string;
  };
}

async function createEvent(inputValue: string): Promise<EventResponse> {
  const { data, status } = await privateInstance.post<EventResponse>(
    '/playlist/event/',
    {
      situations: inputValue,
    },
  );
  if (status !== 200) {
    throw new Error('플리 생성에 실패했습니다.');
  }
  return data;
}

export default function useCreateEvent(
  options?: UseMutationOptions<EventResponse, Error, string>,
) {
  return useMutation<EventResponse, Error, string>(createEvent, options);
}
