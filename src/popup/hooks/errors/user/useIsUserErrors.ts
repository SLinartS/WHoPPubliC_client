import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { IUserFormDataFields } from '@store/popup/form/user/type';
import { TValueOrErrorType } from '@store/type';
import { useCallback } from 'react';

export function useIsUserError() {
  const { storePopup } = useRootStore();

  return useCallback(() => {
    const fields = storePopup.form.user.formData;
    let result = false;
    for (const [key, value] of Object.entries(fields)) {
      const typedKey = key as keyof IUserFormDataFields;
      const typedValue = value as TValueOrErrorType;
      storePopup.form.user.setFormField(typedKey, typedValue.value);
      if (typedValue.errors.length) {
        result = true;
      }
    }
    return result;
  }, []);
}
