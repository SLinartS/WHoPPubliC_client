import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { TTaskType } from '@store/type';
import { useCallback } from 'react';

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
