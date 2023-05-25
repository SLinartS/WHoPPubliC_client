import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { useCallback } from 'react';

import { useGetProductsWithoutLinkToTask } from './useGetProductWithoutLinkToTask';
import { useGetUnselectedProducts } from './useGetUnselectedProduct';

export function useGetActualProductWithLinkToFloor() {
  const { storeProduct } = useRootStore();
  const getUnselectedProducts = useGetUnselectedProducts();
  const getProductWithoutLinkToTask = useGetProductsWithoutLinkToTask();

  return useCallback(() => {
    const unselectedProducts = getUnselectedProducts();
    const productWithoutLinkToTask = getProductWithoutLinkToTask();
    const productIdsWithoutLinkToTask = productWithoutLinkToTask.map(
      (product) => product.id.value,
    );

    const productIdsWithoutLinks =
      storeProduct.state.products.serviceInformation
        .filter(
          (product) =>
            product.floorIds.length > 0 && product.actualFloorIds.length > 0,
        )
        .map((product) => product.productId);

    let productsWithoutLinks = unselectedProducts.filter((product) =>
      productIdsWithoutLinks.includes(product.id.value),
    );
    productsWithoutLinks = productsWithoutLinks.filter((product) =>
      productIdsWithoutLinkToTask.includes(product.id.value),
    );
    return productsWithoutLinks;
  }, []);
}
