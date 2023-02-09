import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { TValueOrErrorType } from '@store/type';
import { useCallback } from 'react';

export function useIsUserError() {
  const { storePopup } = useRootStore();

  return useCallback(() => {
    const fields = storePopup.form.user.formData;
    for (const value of Object.values(fields)) {
      const typedValue: TValueOrErrorType = value;
      if (typedValue.errors.length) {
        return true;
      }
    }
    return false;
  }, []);
}
