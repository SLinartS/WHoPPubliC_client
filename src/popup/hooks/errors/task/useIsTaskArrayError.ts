import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { useCallback } from 'react';

export function useIsTaskArrayErrors() {
  const { storePopup } = useRootStore();

  return useCallback(
    (isCheckFloor: boolean) => {
      const list = storePopup.select.products.values;
      const { floors } = storePopup.select;

      if (floors.errors.length && isCheckFloor) {
        return true;
      }
      if (!list.length) {
        return true;
      }

      return false;
    },
    [storePopup.select.products.values],
  );
}
