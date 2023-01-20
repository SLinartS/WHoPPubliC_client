import { useCallback } from 'react';

import { TTaskType } from '../../../../store/type';
import { useRootStore } from '../../../../utils/RootStoreProvider/useRootStore';

export function useDeleteTask() {
  const { storePopup } = useRootStore();
  return useCallback((taskType: TTaskType, taskId: number) => {
    storePopup.status.show('windowConfirm', () => {
      storePopup.windows.confirm.setSetting({
        variant: 'deleteTask',
        text: `Удалить задачу Id:${taskId}?`,
        itemType: 'tasks',
        itemName: taskType,
        itemId: taskId,
      });
    });
  }, []);
}
