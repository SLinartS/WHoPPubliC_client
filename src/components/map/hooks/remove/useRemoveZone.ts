import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { useCallback } from 'react';

import { useCheckOccupiedSpace } from '../useCheckOccupiedSpace';

export function useRemoveZone() {
  const { storeMap, storePopup } = useRootStore();
  const checkOccupiedSpace = useCheckOccupiedSpace();
  return useCallback((zoneId: number) => {
    if (!checkOccupiedSpace('zone', { zoneId })) {
      storeMap.delete.delete(zoneId, () => {
        storeMap.status.set('fetch', 'pending');
      });
    } else {
      storePopup.status.show('windowInformation', () => {
        storePopup.windows.information.setting = {
          text: 'Можно удалять только пустые зоны',
        };
      });
    }
  }, []);
}
