import { useMemo } from 'react';

import { useGetFreeSpace } from './useGetFreeSpace';
import { useGetOccupiedSpace } from './useGetOccupiedSpace';

export function useIsEnoughFreeSpace() {
  const occepiedSpace = useGetOccupiedSpace();
  const freeSpace = useGetFreeSpace();

  return useMemo(() => {
    if (occepiedSpace <= freeSpace) {
      return true;
    }
    return false;
  }, [occepiedSpace, freeSpace]);
}
