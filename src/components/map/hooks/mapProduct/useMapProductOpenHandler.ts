import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { useCallback } from 'react';

import { useDoMapProductActionBeforeShow } from './useDoMapProductActionBeforeShow';

export function useMapProductOpenHandler(productIds: number[]) {
  const { storeMap, storeProduct, storePopup } = useRootStore();
  const doMapProductActionBeforeShow = useDoMapProductActionBeforeShow();
  return useCallback(() => {
    storeMap.status.set('fetch', 'update');
    if (storeProduct.status.get('fetch') === 'pending') {
      storeProduct.action.fetch('', () => {
        storePopup.status.show('viewMapProducts', () => {
          doMapProductActionBeforeShow(productIds);
        });
      });
    } else {
      storePopup.status.show('viewMapProducts', () => {
        doMapProductActionBeforeShow(productIds);
      });
    }
  }, [productIds]);
}
