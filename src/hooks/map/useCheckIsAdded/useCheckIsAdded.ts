import { useCallback } from 'react';
import { useRootStore } from '../../../utils/RootStoreProvider/useRootStore';

const useCheckIsAdded = () => {
  const { addTaskFormStore } = useRootStore();

  const internalCallback = useCallback(
    (floorId: number): boolean => {
      for (const point of addTaskFormStore.warehousePoints) {
        if (point.floorId === floorId) {
          return true;
        }
      }
      return false;
    },
    [addTaskFormStore.warehousePoints],
  );

  return internalCallback;
};

export default useCheckIsAdded;
