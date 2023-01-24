import { useCallback } from 'react';

import { useRootStore } from '../../../../utils/RootStoreProvider/useRootStore';

export function useGetDataForSelects() {
  const { storeProduct, storeTable } = useRootStore();

  return useCallback(() => {
    const productWithSelectedId = storeProduct.state.products.data.filter(
      (product) =>
        product.id.value ===
        storeTable.selectedItem.getItemId('products', 'products'),
    )[0];
    if (productWithSelectedId) {
      return Object.entries(productWithSelectedId);
    }
    return Object.entries(storeProduct.state.products.data[0]);
  }, []);
}
