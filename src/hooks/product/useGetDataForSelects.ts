import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { useCallback } from 'react';

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
