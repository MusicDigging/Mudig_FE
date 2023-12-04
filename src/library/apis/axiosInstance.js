import axios from 'axios';

const BASE_URL = 'https://github.com/MusicDigging/Mudig_BE';

const baseConfig = {
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
};

const onRequest = (config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `JWT ${token}`;
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
