import { useCallback } from 'react';

import { TPopups } from '../../../../store/popup/status/type';
import { TTaskType } from '../../../../store/type';
import { useRootStore } from '../../../../utils/RootStoreProvider/useRootStore';
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
        storeTask.fetch.oneTask(checkResult.itemId, () => {
          const { taskInfo, productIds, floorIds, pointIds } =
            storeTask.state.task;

          const { task } = storePopup.form;
          task.setFormField('id', String(taskInfo.id.value));
          task.setFormField('article', taskInfo.article.value);
          task.setFormField('timeEnd', taskInfo.timeEnd.value);
          task.setFormField('timeStart', taskInfo.timeStart.value);
          storePopup.select.products.setProductList(productIds);
          if (!isView) {
            storePopup.select.floors.setItems(floorIds);
            storePopup.select.points.values = pointIds;
          }
          storePopup.status.show(openingWindow);
        });
      }
    },
    [],
  );
}
