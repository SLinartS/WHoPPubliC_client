import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { TProductFormDataFields } from '@store/popup/form/product/type';
import { useCallback } from 'react';

export function useChangeFieldHandler() {
  const { storePopup } = useRootStore();

  return useCallback(
    (newValue: string, fieldName: keyof TProductFormDataFields) => {
      storePopup.form.product.setFormField(fieldName, String(newValue));
    },
    [],
  );
}
