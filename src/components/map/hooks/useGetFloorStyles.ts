import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { useMemo } from 'react';

export function useGetFloorStyles(
  id: number,
  number: number,
  capacity: number,
  freeSpace: number,
  reservedSpace: number,
) {
  const { storePopup, storeTask } = useRootStore();
  return useMemo(() => {
    const newStyle = {
      gridRow: `${-number}/${-number - 1}`,
      background: 'unset',
    };
    let freeSpaceRaw = freeSpace / capacity;
    let reservedSpaceRaw = freeSpaceRaw + reservedSpace / capacity;
    if (storePopup.select.floors.checkIsAdded(id)) {
      const floorInfo = storeTask.state.task.floorInfo.find(
        (floor) => floor.floorId === id,
      );
      if (floorInfo) {
        freeSpaceRaw = (freeSpace + floorInfo.occupiedSpace) / capacity;
        reservedSpaceRaw =
          freeSpace / capacity + reservedSpace / capacity - freeSpaceRaw;
      }

      newStyle.background = `linear-gradient(180deg, 
            #e7731f ${freeSpaceRaw * 100}%, 
            #7f8dcf ${freeSpaceRaw * 100}%, 
            #7f8dcf ${reservedSpaceRaw * 100}%, 
            #59468B ${reservedSpaceRaw * 100}%, 
            #59468B ${100}%)`;
    } else {
      newStyle.background = `linear-gradient(180deg, 
            transparent ${freeSpaceRaw * 100}%,
            #7f8dcf ${freeSpaceRaw * 100}%, 
            #7f8dcf ${reservedSpaceRaw * 100}%, 
            #59468B ${reservedSpaceRaw * 100}%, 
            #59468B ${100}%)`;
    }
    return newStyle;
  }, [storePopup.select.floors.checkIsAdded(id)]);
}
