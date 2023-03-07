import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { useCallback } from 'react';

export function useDoMapProductActionBeforeShow() {
  const { storePopup, storeTable, storeProduct } = useRootStore();
  return useCallback((productIds: number[]) => {
    storePopup.select.products.setProductList(productIds);
    storeTable.utils.setDefaultMark(
      'products',
      storeProduct.state.products.data,
      ['categoryId', 'imageUrl'],
    );
  }, []);
}
