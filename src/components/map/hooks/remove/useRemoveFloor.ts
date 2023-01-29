import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { runInAction } from 'mobx';
import { useCallback } from 'react';

import { useCheckOccupiedSpace } from '../useCheckOccupiedSpace';

export function useRemoveFloor() {
  const { storePopup } = useRootStore();
  const checkOccupiedSpace = useCheckOccupiedSpace();
  return useCallback((sectionId: number) => {
    if (!checkOccupiedSpace('floor', { sectionId })) {
      storePopup.form.map.currentZone.sections.forEach((section) => {
        if (section.id === sectionId) {
          section.blocks.forEach((block) => {
            runInAction(() => {
              if (block.floors.length > 1) {
                block.floors.shift();
              }
            });
          });
        }
      });
    } else {
      storePopup.status.show('windowInformation', () => {
        storePopup.windows.information.setting = {
          text: 'Можно удалять только пустые этажи',
        };
      });
    }
  }, []);
}
