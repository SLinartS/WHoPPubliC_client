import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { runInAction } from 'mobx';
import { useCallback } from 'react';

import { useCheckOccupiedSpace } from '../useCheckOccupiedSpace';

export function useRemoveSection() {
  const { storePopup } = useRootStore();
  const checkOccupiedSpace = useCheckOccupiedSpace();

  return useCallback(() => {
    if (!checkOccupiedSpace('section', {})) {
      const { sections } = storePopup.form.map.currentZone;
      runInAction(() => {
        if (sections.length > 1) {
          sections.pop();
        }
      });
    } else {
      storePopup.status.show('windowInformation', () => {
        storePopup.windows.information.setting = {
          text: 'Можно удалять только пустые секции',
        };
      });
    }
  }, []);
}
