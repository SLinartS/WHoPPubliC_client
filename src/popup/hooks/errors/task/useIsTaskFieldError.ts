import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { ITaskFormDataFields } from '@store/popup/form/task/type';
import { TValueOrErrorType } from '@store/type';
import { useCallback } from 'react';

export function useIsTaskFieldErrors() {
  const { storePopup } = useRootStore();

  return useCallback((): boolean => {
    const fields = storePopup.form.task.formData;
    let result = false;
    for (const [key, value] of Object.entries(fields)) {
      const typedKey = key as keyof ITaskFormDataFields;
      const typedValue = value as TValueOrErrorType;
      storePopup.form.task.setFormField(typedKey, typedValue.value);
      if (typedValue.errors.length) {
        result = true;
      }
    }
    return result;
  }, [storePopup.form.task.formData]);
}
