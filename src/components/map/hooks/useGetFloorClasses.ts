import { useMemo } from 'react';

import { useCheckCurrentOrFutureFloor } from './useCheckCurrentOrFutureFloor';

export function useGetFloorClasses(id: number) {
  const checkCurrentOrFutureFloorHook = useCheckCurrentOrFutureFloor();
  return useMemo(() => {
    let newClasses = '';
    const checkResult = checkCurrentOrFutureFloorHook(id);
    if (checkResult.result) {
      newClasses += `map-block__floor--animation-${checkResult.type}`;
    }
    return newClasses;
  }, []);
}
