import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosRequest from '../api';

interface infoProps {
  method: string;
  url: string;
  data?: {};
  headers?: {};
}

const useCustomMutation = <T>(key: string[], info: infoProps) => {
  const queryClient = useQueryClient();

  const customMutation = () =>
    useMutation(
      () => {
        return axiosRequest.requestAxios<T>(info.method, info.url, info.data);
      },
      {
        onSuccess: () => {
          // 새로운 데이터가 서버에 성공적으로 전송되고 새로운 게시물이 추가되었음을 나타내기 위해 사용
          queryClient.invalidateQueries(key);
        }
      }
    );

  return customMutation;
};

export default useCustomMutation;
