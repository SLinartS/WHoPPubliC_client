import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { TPopups } from '@store/popup/status/type';
import { TTaskType } from '@store/type';
import { useCallback } from 'react';

import { useCheckIsSelect } from '../useCheckIsSelect';

export function useFetchOneTaskAndFillForm() {
  const { storeTask, storePopup } = useRootStore();
  const checkSelected = useCheckIsSelect();

  return useCallback(
    (
      itemName: TTaskType,
      openingWindow: TPopups,
      warningText: string,
      isView = false,
    ) => {
      const checkResult = checkSelected('tasks', itemName, warningText);
      if (checkResult.result) {
        storeTask.action.show(checkResult.itemId, () => {
          const { taskInfo, productIds, floorInfo, pointIds } =
            storeTask.state.task;

          const { task } = storePopup.form;

          const dateStart = taskInfo.timeStart.value.substring(0, 10);
          const timeStart = taskInfo.timeStart.value.substring(11, 16);
          const dateEnd = taskInfo.timeEnd.value.substring(0, 10);
          const timeEnd = taskInfo.timeEnd.value.substring(11, 16);

          task.setFormField('id', String(taskInfo.id.value));
          task.setFormField('article', taskInfo.article.value);

          task.setFormField('dateStart', dateStart);
          task.setFormField('timeStart', timeStart);

          task.setFormField('dateEnd', dateEnd);
          task.setFormField('timeEnd', timeEnd);

          storePopup.select.products.setProductList(productIds);
          if (!isView) {
            storePopup.select.floors.setItems(
              floorInfo.map((floor) => floor.floorId),
            );
            storePopup.select.points.values = pointIds;
          }
          storePopup.status.show(openingWindow);
        });
      }
    },
    [],
  );
}
