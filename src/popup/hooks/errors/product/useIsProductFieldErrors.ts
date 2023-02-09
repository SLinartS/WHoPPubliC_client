import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { TValueOrErrorType } from '@store/type';
import { useCallback } from 'react';

export function useIsProductFieldErrors() {
  const { storePopup } = useRootStore();
  return useCallback((): boolean => {
    const fields = storePopup.form.product.formData;
    for (const value of Object.values(fields)) {
      const typedValue: TValueOrErrorType = value;
      if (typedValue.errors.length) {
        return true;
      }
    }
    return false;
  }, [storePopup.form.product.formData]);
}
