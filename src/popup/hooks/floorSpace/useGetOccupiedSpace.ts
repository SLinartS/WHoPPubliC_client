import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { useMemo } from 'react';

export function useGetOccupiedSpace() {
  const { storePopup } = useRootStore();

  return useMemo(() => {
    let occepiedSpace = 0;
    const productListData = storePopup.select.products.getProductListData();
    for (const product of productListData) {
      occepiedSpace += Number(product.number.value);
    }
    return occepiedSpace;
  }, [storePopup.select.products.getProductListData()]);
}
