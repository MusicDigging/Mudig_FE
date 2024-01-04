import axios from 'axios';

const BASE_URL = 'https://api.mudig.co.kr';

const baseConfig = {
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
};

const onRequest = (config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

const onResponseError = async (error) => {
  // console.log('토큰 만료');
  const originalRequest = error.config;
  const isAutoLogin = localStorage.getItem('autoLogin');
  if (error.response.status === 401) {
    const refreshToken = localStorage.getItem('refreshToken');

    if (refreshToken) {
      try {
        const response = await axios.post(
          `${BASE_URL}/user/api/token/refresh/`,
          {
            refresh: refreshToken,
          },
        );

        const newAccessToken = response.data.access;

        localStorage.setItem('token', newAccessToken);
        console.log(response.data);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        // console.log('토큰 교체 완료');

        return axios(originalRequest);
      } catch (Error) {
        console.error(' 토큰 교체 실패:', Error);
        window.localStorage.clear();
      }
    }
  }
};

// 기본 인스턴스
export const axiosInstance = axios.create(baseConfig);

// 인증 요청 인스턴스
export const privateInstance = axios.create(baseConfig);
privateInstance.interceptors.request.use(onRequest);
privateInstance.interceptors.response.use(null, onResponseError);

export const imgPrivateInstance = axios.create({
  ...baseConfig,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
imgPrivateInstance.interceptors.request.use(onRequest);
