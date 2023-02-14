import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { TValueOrErrorType } from '@store/type';
import { useCallback } from 'react';

export function useIsLoginError() {
  const { storeAuth } = useRootStore();

  return useCallback(() => {
    const fields = storeAuth.state.auth;
    for (const value of Object.values(fields)) {
      const typedValue: TValueOrErrorType = value;
      if (typedValue.errors.length) {
        return true;
      }
    }
    return false;
  }, []);
}
