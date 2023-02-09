import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { IProduct } from '@store/product/type';
import { useCallback } from 'react';

export function useGetUnselectedProducts() {
  const { storeProduct, storePopup } = useRootStore();

  return useCallback(() => {
    const unselectedProducts: IProduct[] =
      storeProduct.state.products.data.filter(
        (product) =>
          !storePopup.select.products.values.includes(product.id.value),
      );
    return unselectedProducts;
  }, []);
}
