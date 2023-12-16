import axios from 'axios';

const BASE_URL = 'https://api.mudig.co.kr';

const baseConfig = {
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
};

const onRequest = (config) => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAyNDQ2NDQwLCJpYXQiOjE3MDI0MzkyNDAsImp0aSI6IjEzNTAwZWI3M2U3YTQ5ZDRhZDNjOWM5MDJhMTg0YTkyIiwidXNlcl9pZCI6Njd9.qpvid9G3sYrJUFvG6GCkndb50QuarydswUc_NtiQtw4';
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

// 기본 인스턴스
export const axiosInstance = axios.create(baseConfig);

// 인증 요청 인스턴스
export const privateInstance = axios.create(baseConfig);
privateInstance.interceptors.request.use(onRequest);

export const imgPrivateInstance = axios.create({
  ...baseConfig,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
imgPrivateInstance.interceptors.request.use(onRequest);
