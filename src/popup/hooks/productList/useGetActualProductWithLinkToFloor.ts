import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { useCallback } from 'react';

import { useGetUnselectedProducts } from './useGetUnselectedProduct';

export function useGetActualProductWithLinkToFloor() {
  const { storeProduct } = useRootStore();
  const getUnselectedProducts = useGetUnselectedProducts();

  return useCallback(() => {
    const products = getUnselectedProducts();
    const productIdsWithoutLinks =
      storeProduct.state.products.serviceInformation
        .filter(
          (product) =>
            product.floorIds.length > 0 && product.actualFloorIds.length > 0,
        )
        .map((product) => product.productId);
    const productsWithoutLinks = products.filter((product) =>
      productIdsWithoutLinks.includes(product.id.value),
    );
    return productsWithoutLinks;
  }, []);
}
