import { useQuery } from '@tanstack/react-query';
import axiosRequest from '../api';

interface QueryData<T> {
  data: T | undefined;
  isLoading: boolean;
  isError: boolean;
  error: any; // Todo: error-boundary
}

interface infoProps {
  method: string;
  url: string;
  enabled: boolean;
}

/**
 * 작성자명   : 원종석
 * 작성일자   : 2023.11.06.(월)
 * 작성내용   : useQuery 커스텀 훅
 * 수정일자   : none
 * 수정내용   : none
 * @param key 내부적으로 데이터를 캐시하고 쿼리에 대한 종속성이 변경될 때 자동으로 다시 가져올 수 있게 하는 고유한 키 값
 * @param info 호출 method와 url 정보를 담은 객체 데이터
 * @returns
 */
const useCustomQuery = <T>(key: string[], info: infoProps): QueryData<T> => {
  const { data, isLoading, isError, error } = useQuery<T, Error>({
    queryKey: key,
    queryFn: () => axiosRequest.requestAxios<T>(info.method, info.url),
    enabled: !!info.enabled
  });

  return { data, isLoading, isError, error };
};

export default useCustomQuery;
