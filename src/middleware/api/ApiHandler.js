import { BASE_URL } from 'src/utils/constants';
import axiosApiInstance from './AxiosInstance';

const ApiHandler = {
  post: async (url, data) => axiosApiInstance.post(BASE_URL + url, data),
  put: async (url, data) => axiosApiInstance.put(BASE_URL + url, data),
  patch: async (url, data) => axiosApiInstance.patch(BASE_URL + url, data),
  delete: async (url) => axiosApiInstance.delete(BASE_URL + url),
  get: async (url) => axiosApiInstance.get(BASE_URL + url)
};

export default ApiHandler;
