import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { TPointType } from '@store/type';
import { useMemo } from 'react';

export function useGetPointClasses(id: number, pointsType: TPointType) {
  const { storeProduct, storePopup } = useRootStore();

  return useMemo(() => {
    let newClasses = '';
    if (
      storeProduct.state.product.serviceInformation.pointIds.includes(id) &&
      storePopup.status.getStatus('viewLocation')
    ) {
      if (pointsType === 'acceptance') {
        newClasses += 'points-map__point--animation-current';
      } else {
        newClasses += 'points-map__point--animation-future';
      }
    }
    return newClasses;
  }, [storeProduct.state.product.serviceInformation.pointIds]);
}
