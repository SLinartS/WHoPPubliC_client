import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { useGetLocalStorage } from '@hooks/useGetLocalStorage/useGetLocalStorage';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export function useRouterProtect() {
  const { storeAuth } = useRootStore();
  const navigate = useNavigate();
  const getLocalStorage = useGetLocalStorage();

  return useCallback((route: string): void => {
    getLocalStorage(['userData']);
    if (!storeAuth.state.isAuth) {
      navigate('/login');
    }
    if (['operator'].includes(storeAuth.state.userData.role)) {
      if (['users'].includes(route)) {
        navigate('/');
      }
    }
    if (['worker'].includes(storeAuth.state.userData.role)) {
      if (['users', 'products'].includes(route)) {
        navigate('/');
      }
    }
  }, []);
}
