import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { IUserData } from '@store/authorization/type';
import { useCallback } from 'react';

export function useGetLocalStorage() {
  const { storeAuth } = useRootStore();

  return useCallback((items: string[]) => {
    items.forEach((item) => {
      switch (item) {
        case 'userData': {
          const userDataStr = localStorage.getItem('userData');
          if (userDataStr) {
            try {
              const userData: IUserData = JSON.parse(userDataStr);
              storeAuth.state.userData = userData;
            } catch (error) {
              localStorage.removeItem('userData');
            }
          }
          break;
        }
        default:
      }
    });
  }, []);
}
