import axios, { AxiosError, AxiosResponse } from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // 쿠키 기반 인증을 위해 추가
});

const onError = (status: number, message: string) => {
  const error = { status, message };
  throw error;
};

// 요청 인터셉터 설정 (필요한 경우 사용자 인증이나 추가적인 로직 처리 가능)
instance.interceptors.request.use((config) => {
  // 추가적인 요청 설정이 필요하면 이곳에서 처리할 수 있습니다.
  return config;
});

instance.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    const { status, data } = error.response as AxiosResponse;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest.headers._retry &&
      originalRequest.url !== '/auth/tokens' // 토큰 재발급 관련 처리 예외
    ) {
      // 액세스 토큰 만료로 인한 재시도는 쿠키 기반 처리에 따라 필요 시 서버와 협의 가능
      originalRequest.headers._retry = true;
      // 필요 시 리프레시 토큰 처리 로직 추가 가능
      return instance(originalRequest);
    }

    switch (status) {
      case 400:
      case 401:
      case 403:
      case 404:
      case 409:
        onError(status, data.message);
        break;
    }

    return Promise.reject(error);
  },
);

export default instance;
