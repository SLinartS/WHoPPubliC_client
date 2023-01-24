import { useCallback } from 'react';

import {
  TSelectedItems,
  TSelectedProducts,
} from '../../../../store/table/selectedItem/type';
import { TTaskType } from '../../../../store/type';
import { useCheckIsSelect } from '../useCheckIsSelect';
import { useDeleteProduct } from './useDeleteProduct';
import { useDeleteTask } from './useDeleteTask';

export function useDeleteController() {
  const deleteTask = useDeleteTask();
  const deleteProduct = useDeleteProduct();
  const checkSelected = useCheckIsSelect();

  return useCallback(
    (
      itemType: keyof TSelectedItems,
      itemName: TTaskType | TSelectedProducts,
      warningText: string,
    ) => {
      const checkResult = checkSelected(itemType, itemName, warningText);
      if (checkResult.result) {
        switch (itemName) {
          case 'acceptance':
          case 'shipment':
          case 'intra':
            deleteTask(itemName, checkResult.itemId);
            break;
          case 'products':
            deleteProduct(checkResult.itemId);
            break;
          default:
        }
      }
    },
    [],
  );
}
