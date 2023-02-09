import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { TValueOrErrorType } from '@store/type';
import { useCallback } from 'react';

export function useIsTaskFieldErrors() {
  const { storePopup } = useRootStore();

  return useCallback((): boolean => {
    const fields = storePopup.form.task.formData;
    for (const value of Object.values(fields)) {
      const typedValue: TValueOrErrorType = value;
      if (typedValue.errors.length) {
        return true;
      }
    }
    return false;
  }, [storePopup.form.task.formData]);
}
