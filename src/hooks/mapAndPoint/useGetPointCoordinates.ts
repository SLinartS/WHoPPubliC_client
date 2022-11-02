import { useCallback } from 'react';

export interface IUseGetPointCoordinatesReturn {
  point: {
    id: number;
    index: number;
  };
}

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
