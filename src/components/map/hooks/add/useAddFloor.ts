import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { idGenerator } from '@utils/idGenerator/idGenerator';
import { runInAction } from 'mobx';
import { useCallback } from 'react';

export function useAddFloor() {
  const { storePopup } = useRootStore();
  return useCallback((sectionId: number) => {
    storePopup.form.map.currentZone.sections.forEach((section) => {
      if (section.id === sectionId) {
        section.blocks.forEach((block) => {
          const lastFloor = block.floors[0];
          runInAction(() => {
            block.floors.unshift({
              id: idGenerator(),
              number: lastFloor.number + 1,
              capacity: 300,
              freeSpace: 300,
              reservedSpace: 0,
              isSearch: false,
              productIds: [],
            });
          });
        });
      }
    });
  }, []);
}
