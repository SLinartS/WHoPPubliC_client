import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { useCallback } from 'react';

export function useIsProductFileErrors() {
  const { storePopup, storeProduct } = useRootStore();
  return useCallback((): boolean => {
    const file = storePopup.form.product.getFile().value;
    const imageUrl = storeProduct.state.product.productInfo.imageUrl.value;

    if (!file && !imageUrl) {
      storePopup.form.product.setFileErrors(['Установите изображение товара']);
      return true;
    }
    storePopup.form.product.setFileErrors([]);
    return false;
  }, [storePopup.form.product.getFile()]);
}
