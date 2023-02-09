import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { IProduct } from '@store/product/type';
import { useCallback } from 'react';

import { useGetUnselectedProducts } from './useGetUnselectedProduct';

export function useGetProductsWithoutLinkToTask() {
  const { storeProduct } = useRootStore();
  const unselectedProducts = useGetUnselectedProducts();

  return useCallback(() => {
    const idsProductsWithoutLinkToTask: number[] =
      storeProduct.state.products.serviceInformation
        .filter((product) => product.taskId === 0)
        .map((product) => product.productId);

    const productsWithoutLinkToTask: IProduct[] = unselectedProducts().filter(
      ($product) => idsProductsWithoutLinkToTask.includes($product.id.value),
    );

    return productsWithoutLinkToTask;
  }, []);
}
