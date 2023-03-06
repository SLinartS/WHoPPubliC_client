import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { useCallback } from 'react';

export function useIsProductFileErrors() {
  const { storePopup } = useRootStore();
  return useCallback((): boolean => {
    const file = storePopup.form.product.getFile();
    if (!file) {
      storePopup.form.product.setFileErrors(['Установите изображение товара']);
      return true;
    }
    storePopup.form.product.setFileErrors([]);
    return false;
  }, [storePopup.form.product.getFile()]);
}
