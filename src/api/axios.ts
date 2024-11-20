import axios, { AxiosError, AxiosResponse } from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const onError = (status: number, message: string) => {
  const error = { status, message };
  throw error;
};

instance.interceptors.request.use((config) => {
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
      originalRequest.headers._retry = true;
      // 리프레시 토큰 처리 로직 추가
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
