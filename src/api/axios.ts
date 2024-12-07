import axios, { AxiosError, AxiosResponse } from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const onError = (status: number, message: string) => {
  const error = { status, message };
  throw error;
};

instance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers['Authorization'] = accessToken;
  }
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
      originalRequest.url !== '/auth/tokens'
    ) {
      originalRequest.headers._retry = true;
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
