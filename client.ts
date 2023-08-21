import axios from 'axios';
import { BASE_URL } from './constants';

const axiosClient = axios.create({
    baseURL:BASE_URL,
    headers:{Authorization:true},
    withCredentials:true,
    responseType:"json"
});
axiosClient.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    return Promise.reject({message:"Client Error"});
  });

// Add a response interceptor
axiosClient.interceptors.response.use(function (response) {
    return response?.data;
    }, function (error) {
      return Promise.reject(error?.response?.data);
});

export default axiosClient;