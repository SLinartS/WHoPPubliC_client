import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { IAuthorizationData } from '@store/authorization/type';
import { TValueOrErrorType } from '@store/type';
import { useCallback } from 'react';

export function useIsLoginErrors() {
  const { storeAuth } = useRootStore();

  return useCallback(() => {
    const fields = storeAuth.state.auth;
    for (const [key, value] of Object.entries(fields)) {
      const typedKey = key as keyof IAuthorizationData;
      const typedValue = value as TValueOrErrorType;
      storeAuth.state.setAuthField(typedKey, typedValue.value);
      if (typedValue.errors.length) {
        return true;
      }
    }
    return false;
  }, []);
}
