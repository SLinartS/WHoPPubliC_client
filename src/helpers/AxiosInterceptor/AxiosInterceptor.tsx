import { IResponseUserData } from '@store/authorization/type';
import extendAxios from '@utils/extendAxios';
import axios, { AxiosResponse } from 'axios';
import { FC, ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AxiosInterceptorProps {
  children: ReactNode;
}

const AxiosInterceptor: FC<AxiosInterceptorProps> = ({ children }) => {
  const navigate = useNavigate();
  const [isSet, setIsSet] = useState(false);

  useEffect(() => {
    const interceptor = extendAxios.interceptors.response.use(
      (config: AxiosResponse) => config,
      /* eslint-disable consistent-return, @typescript-eslint/return-await */
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._isRetry) {
          originalRequest._isRetry = true;
          try {
            const response = await axios.post<IResponseUserData>(
              `${process.env.REACT_APP_API_URL}refresh`,
              { refreshToken: localStorage.getItem('refreshToken') },
              { withCredentials: true },
            );
            localStorage.setItem('accessToken', response.data.tokens.access);
            localStorage.setItem('refreshToken', response.data.tokens.refresh);

            originalRequest!.headers = {
              ...originalRequest!.headers,
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            };
            return axios.request(originalRequest);
          } catch (e) {
            console.log('Not authorized');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('userData');
            navigate('/login');
          }
        }
        throw error;
      },
      /* eslint-enable consistent-return, @typescript-eslint/return-await */
    );
    setIsSet(true);

    return () => extendAxios.interceptors.response.eject(interceptor);
  }, []);

  /* eslint-disable-next-line react/jsx-no-useless-fragment */
  return <>{isSet && children}</>;
};

export default AxiosInterceptor;
