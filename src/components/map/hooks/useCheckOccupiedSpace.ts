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
    let isOccupied = false;

    if (type === 'floor') {
      storePopup.form.map.currentZone.sections.forEach((section) => {
        if (section.id === coordinates.sectionId) {
          section.blocks.forEach((block) => {
            if (block.floors[0].capacity - block.floors[0].freeSpace !== 0) {
              isOccupied = true;
            }
          });
        }
      });
    }

    if (type === 'block') {
      storePopup.form.map.currentZone.sections.forEach((section) => {
        if (section.id === coordinates.sectionId) {
          section.blocks[section.blocks.length - 1].floors.forEach((floor) => {
            if (floor.capacity - floor.freeSpace !== 0) {
              isOccupied = true;
            }
          });
        }
      });
    }

    if (type === 'section') {
      storePopup.form.map.currentZone.sections[
        storePopup.form.map.currentZone.sections.length - 1
      ].blocks.forEach((block) => {
        block.floors.forEach((floor) => {
          if (floor.capacity - floor.freeSpace !== 0) {
            isOccupied = true;
          }
        });
      });
    }

    if (type === 'zone') {
      storeMap.state.map.forEach((zone) => {
        if (zone.id === coordinates.zoneId) {
          zone.sections.forEach((section) => {
            section.blocks.forEach((block) => {
              block.floors.forEach((floor) => {
                if (floor.capacity - floor.freeSpace !== 0) {
                  isOccupied = true;
                }
              });
            });
          });
        }
      });
    }

    return isOccupied;
  }, []);
}
