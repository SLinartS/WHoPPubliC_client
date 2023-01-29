import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { runInAction } from 'mobx';
import { useCallback } from 'react';

import { useCheckOccupiedSpace } from '../useCheckOccupiedSpace';

export function useRemoveBlock() {
  const { storePopup } = useRootStore();
  const checkOccupiedSpace = useCheckOccupiedSpace();

  return useCallback((sectionId: number) => {
    if (!checkOccupiedSpace('block', { sectionId })) {
      storePopup.form.map.currentZone.sections.forEach((section) => {
        if (section.id === sectionId) {
          runInAction(() => {
            if (section.blocks.length > 1) {
              section.blocks.pop();
            }
          });
        }
      });
    } else {
      storePopup.status.show('windowInformation', () => {
        storePopup.windows.information.setting = {
          text: 'Можно удалять только пустые блоки',
        };
      });
    }
  }, []);
}
