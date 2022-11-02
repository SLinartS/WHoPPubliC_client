import { useCallback } from 'react';
import { IUseGetPointCoordinatesReturn } from './type';

const useGetPointCoordinates = () => {
  const internalCallback = useCallback(
    (floor: HTMLDivElement): IUseGetPointCoordinatesReturn => {
      const { pointId, pointIndex } = floor.dataset;

      return {
        point: {
          id: Number(pointId),
          index: Number(pointIndex),
        },
      };
    },
    [],
  );

  return internalCallback;
};

export default useGetPointCoordinates;
