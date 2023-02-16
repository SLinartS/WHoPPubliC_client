import axios from 'axios';

const extendAxios = axios.create({
  withCredentials: true,
  baseURL: `${process.env.REACT_APP_API_URL}`,
});

extendAxios.interceptors.request.use((config) => {
  const configWithHeaders = config;
  configWithHeaders!.headers!.Authorization = `Bearer ${localStorage.getItem(
    'accessToken',
  )}`;
  return configWithHeaders;
});

export default extendAxios;
