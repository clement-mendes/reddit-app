import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import AsyncStorage from '@react-native-async-storage/async-storage';

export const axiosApiInstance = axios.create();

axiosApiInstance.interceptors.request.use(
  async (config) => {
    const value = await AsyncStorage.getItem('@ACCESS_TOKEN');
    config.headers = {
      Authorization: `Bearer ${value}`,
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// axiosApiInstance.interceptors.response.use((response) => {
//   return response
// }, async function (error) {
//   const originalRequest = error.config;
//   if (error.response.status === 403 && !originalRequest._retry) {
//     originalRequest._retry = true;
//     const access_token = await refreshAccessToken();
//     axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
//     return axiosApiInstance(originalRequest);
//   }
//   return Promise.reject(error);
// });
