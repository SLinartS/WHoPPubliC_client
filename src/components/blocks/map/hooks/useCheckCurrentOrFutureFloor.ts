import { useCallback } from 'react';

import { useRootStore } from '../../../../utils/RootStoreProvider/useRootStore';

interface THookReturn {
  result: boolean;
  type: 'current' | 'future';
}

export function useCheckCurrentOrFutureFloor() {
  const { storeProduct } = useRootStore();
  const { actualFloorIds } = storeProduct.state.product.serviceInformation;
  const { floorIds } = storeProduct.state.product.serviceInformation;

  return useCallback((floorId: number): THookReturn => {
    if (actualFloorIds.includes(floorId)) {
      return { result: true, type: 'current' };
    }
    if (floorIds.includes(floorId)) {
      return { result: true, type: 'future' };
    }
    return { result: false, type: 'current' };
  }, []);
}
