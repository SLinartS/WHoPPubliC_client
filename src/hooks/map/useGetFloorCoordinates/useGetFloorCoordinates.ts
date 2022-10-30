import { useCallback } from 'react';
import { IUseGetFloorCoordinatesReturn } from './type';

const useGetFloorCoordinates = () => {
  const internalCallback = useCallback(
    (floor: HTMLDivElement): IUseGetFloorCoordinatesReturn => {
      const { floorId, floorIndex } = floor.dataset;

      const blockParent: HTMLDivElement = floor.parentNode as HTMLDivElement;
      const { blockId, blockIndex } = blockParent.dataset;

      const sectionParent: HTMLDivElement =
        blockParent.parentNode as HTMLDivElement;
      const { sectionId, sectionIndex } = sectionParent.dataset;

      const zoneParent: HTMLDivElement =
        sectionParent.parentNode as HTMLDivElement;
      const { zoneId, zoneIndex } = zoneParent.dataset;

      return {
        zone: {
          id: Number(zoneId),
          index: Number(zoneIndex),
        },
        section: {
          id: Number(sectionId),
          index: Number(sectionIndex),
        },
        block: {
          id: Number(blockId),
          index: Number(blockIndex),
        },
        floor: {
          id: Number(floorId),
          index: Number(floorIndex),
        },
      };
    },
    [],
  );

  return internalCallback;
};

export default useGetFloorCoordinates;
