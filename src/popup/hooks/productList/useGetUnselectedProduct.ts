import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { IProductInfo } from '@store/product/type';
import { useCallback } from 'react';

export function useGetUnselectedProducts() {
  const { storeProduct, storePopup } = useRootStore();

  return useCallback(() => {
    const unselectedProducts: IProductInfo[] =
      storeProduct.state.products.data.filter(
        (product) =>
          !storePopup.select.products.values.includes(product.id.value),
      );
    return unselectedProducts;
  }, []);
}
