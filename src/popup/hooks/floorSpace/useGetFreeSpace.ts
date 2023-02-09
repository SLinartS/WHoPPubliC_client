import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { useMemo } from 'react';

export function useGetFreeSpace() {
  const { storePopup, storeMap, storeTask } = useRootStore();

  return useMemo((): number => {
    const selectedFloors = storePopup.select.floors.values;
    let freeSpace = 0;

    storeMap.state.map.forEach((zone) => {
      zone.sections.forEach((section) => {
        section.blocks.forEach((block) => {
          block.floors.forEach((floor) => {
            if (selectedFloors.includes(floor.id)) {
              const floorInfo = storeTask.state.task.floorInfo.find(
                (floorItem) => floorItem.floorId === floor.id,
              );
              if (floorInfo) {
                freeSpace += floor.freeSpace + floorInfo.occupiedSpace;
              } else {
                freeSpace += floor.freeSpace;
              }
            }
          });
        });
      });
    });

    return freeSpace;
  }, [storePopup.select.floors.values.length, storeMap.state.map]);
}
