import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { idGenerator } from '@utils/idGenerator/idGenerator';
import { letterGenerator } from '@utils/letterGenerator/letterGenerator';
import { runInAction } from 'mobx';
import { useCallback } from 'react';

export function useAddZone() {
  const { storeMap, storePopup } = useRootStore();
  return useCallback(() => {
    storePopup.status.show('formMap', () => {
      let lastZoneIndex = storeMap.state.map.length - 1;

      const currentZoneId = idGenerator();
      storePopup.form.map.currentZone = {
        id: currentZoneId,
        number: storeMap.state.map[lastZoneIndex].number + 1,
        sections: [],
        zoneLetter: letterGenerator(),
      };

      lastZoneIndex = storeMap.state.map.length - 1;

      runInAction(() => {
        storePopup.form.map.currentZone.sections.push({
          id: idGenerator(),
          number: 1,
          blocks: [],
        });

        storePopup.form.map.currentZone.sections[0].blocks.push({
          id: idGenerator(),
          number: 1,
          floors: [],
        });

        storePopup.form.map.currentZone.sections[0].blocks[0].floors.push({
          id: idGenerator(),
          number: 1,
          capacity: 300,
          freeSpace: 300,
          reservedSpace: 0,
        });
      });
    });
  }, []);
}
