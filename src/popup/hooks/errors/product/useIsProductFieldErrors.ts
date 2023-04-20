import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { TProductFormDataFields } from '@store/popup/form/product/type';
import { TValueOrErrorType } from '@store/type';
import { useCallback } from 'react';

export function useIsProductFieldErrors() {
  const { storePopup } = useRootStore();
  return useCallback((): boolean => {
    const fields = storePopup.form.product.formData;
    let result = false;
    for (const [key, value] of Object.entries(fields)) {
      const typedKey = key as keyof TProductFormDataFields;
      const typedValue = value as TValueOrErrorType;
      storePopup.form.product.setFormField(typedKey, typedValue.value);
      if (typedValue.errors.length) {
        result = true;
      }
    }
    return result;
  }, [storePopup.form.product.formData]);
}
