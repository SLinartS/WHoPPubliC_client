import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { idGenerator } from '@utils/idGenerator/idGenerator';
import { runInAction } from 'mobx';
import { useCallback } from 'react';

export function useAddBlock() {
  const { storePopup } = useRootStore();
  return useCallback((sectionId: number) => {
    storePopup.form.map.currentZone.sections.forEach((section) => {
      if (section.id === sectionId) {
        const lastBlock = section.blocks[section.blocks.length - 1];

        runInAction(() => {
          section.blocks.push({
            id: idGenerator(),
            number: lastBlock.number + 1,
            floors: [],
          });

          let lastNumber = 0;
          for (let i = 1; i <= section.blocks[0].floors.length; i += 1) {
            lastNumber += 1;
            section.blocks[section.blocks.length - 1].floors.unshift({
              id: idGenerator(),
              number: lastNumber,
              capacity: 300,
              freeSpace: 300,
              reservedSpace: 0,
            });
          }
        });
      }
    });
  }, []);
}
