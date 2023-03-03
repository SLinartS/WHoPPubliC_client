import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { useCallback } from 'react';

export function useIsProductArrayErrors() {
  const { storePopup } = useRootStore();

  return useCallback((): boolean => {
    const { points } = storePopup.select;

    if (!points.values.length) {
      points.errors = ['Точки не выбраны'];
      return true;
    }

    return false;
  }, [storePopup.select.points.errors.length]);
}
