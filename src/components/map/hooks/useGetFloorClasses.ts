import { useMemo } from 'react';

import { useCheckCurrentOrFutureFloor } from './useCheckCurrentOrFutureFloor';

export function useGetFloorClasses(id: number) {
  const checkCurrentOrFutureFloorhook = useCheckCurrentOrFutureFloor();
  return useMemo(() => {
    let newClasses = '';
    const checkResult = checkCurrentOrFutureFloorhook(id);
    if (checkResult.result) {
      newClasses += `map-block__floor--animation-${checkResult.type}`;
    }
    return newClasses;
  }, []);
}
