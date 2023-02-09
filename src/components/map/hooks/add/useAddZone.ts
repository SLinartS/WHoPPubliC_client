import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { idGenerator } from '@utils/idGenerator/idGenerator';
import { runInAction } from 'mobx';
import { useCallback } from 'react';

export function useAddZone() {
  const { storeMap, storePopup, storeUtils } = useRootStore();
  return useCallback(() => {
    storePopup.status.show('formMap', () => {
      let lastZoneIndex = storeMap.state.map.length - 1;

      const currentZoneId = idGenerator();
      storeUtils.generateZoneLetter(() => {
        storePopup.form.map.currentZone = {
          id: currentZoneId,
          number: storeMap.state.map[lastZoneIndex].number + 1,
          sections: [],
          zoneLetter: storeUtils.zoneLetter,
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
    });
  }, []);
}
