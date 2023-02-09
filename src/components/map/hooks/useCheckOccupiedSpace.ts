import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { useCallback } from 'react';

type TCheckType = 'zone' | 'section' | 'block' | 'floor';

interface ICoordinates {
  sectionId?: number;
  zoneId?: number;
}

export function useCheckOccupiedSpace() {
  const { storePopup, storeMap } = useRootStore();

  return useCallback((type: TCheckType, coordinates: ICoordinates): boolean => {
    if (type === 'floor') {
      return storePopup.form.map.currentZone.sections.some((section) => {
        if (section.id === coordinates.sectionId) {
          return section.blocks.some((block) => {
            return block.floors[0].capacity - block.floors[0].freeSpace !== 0;
          });
        }
        return false;
      });
    }

    if (type === 'block') {
      return storePopup.form.map.currentZone.sections.some((section) => {
        if (section.id === coordinates.sectionId) {
          return section.blocks[section.blocks.length - 1].floors.some(
            (floor) => {
              return floor.capacity - floor.freeSpace !== 0;
            },
          );
        }
        return false;
      });
    }

    if (type === 'section') {
      return storePopup.form.map.currentZone.sections[
        storePopup.form.map.currentZone.sections.length - 1
      ].blocks.some((block) => {
        return block.floors.some((floor) => {
          return floor.capacity - floor.freeSpace !== 0;
        });
      });
    }

    if (type === 'zone') {
      return storeMap.state.map.some((zone) => {
        if (zone.id === coordinates.zoneId) {
          return zone.sections.some((section) => {
            return section.blocks.some((block) => {
              return block.floors.some((floor) => {
                return floor.capacity - floor.freeSpace !== 0;
              });
            });
          });
        }
        return false;
      });
    }

    return true;
  }, []);
}
