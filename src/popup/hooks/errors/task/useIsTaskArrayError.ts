import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { useCallback } from 'react';

export function useIsTaskArrayErrors() {
  const { storePopup } = useRootStore();

  return useCallback(
    (isCheckFloor: boolean) => {
      const { floors, products } = storePopup.select;

      if (!floors.values.length && isCheckFloor) {
        floors.errors = ['Точки не выбраны'];
        return true;
      }
      if (!products.values.length) {
        products.errors = ['Точки не выбраны'];
        return true;
      }

      return false;
    },
    [storePopup.select.products.values],
  );
}
