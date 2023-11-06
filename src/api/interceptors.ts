import { AxiosInstance } from 'axios';

const interceptors = (apiInstance: AxiosInstance): AxiosInstance => {
  // 요청 인터셉터
  apiInstance.interceptors.request.use(
    // 첫번째 인자는 req
    (req) => {
      // 요청 데이터가 FormData라면 headers의 Content-Type 수정
      if (req.data instanceof FormData) {
        req.headers['Content-Type'] = 'multipart/form-data';
      }
      return req;
    },
    // error
    (err) => {
      throw err;
    }
  );
  // 응답 인터셉터
  apiInstance.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      throw error;
    }
  );
  return apiInstance;
};

export default interceptors;
