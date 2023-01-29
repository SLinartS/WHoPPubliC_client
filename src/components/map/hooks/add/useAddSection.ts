import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { idGenerator } from '@utils/idGenerator/idGenerator';
import { runInAction } from 'mobx';
import { useCallback } from 'react';

export function useAddSection() {
  const { storePopup } = useRootStore();
  return useCallback(() => {
    const { sections } = storePopup.form.map.currentZone;
    const lastSection = sections[sections.length - 1];

    runInAction(() => {
      sections.push({
        id: idGenerator(),
        number: lastSection.number + 1,
        blocks: [],
      });
      sections[sections.length - 1].blocks.push({
        id: idGenerator(),
        number: 1,
        floors: [],
      });
      sections[sections.length - 1].blocks[0].floors.push({
        id: idGenerator(),
        number: 1,
        capacity: 300,
        freeSpace: 300,
        reservedSpace: 0,
      });
    });
  }, []);
}
