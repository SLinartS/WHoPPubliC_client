import { useCheckIsSelect } from '@hooks/useCheckIsSelect';
import {
  TSelectedItems,
  TSelectedProducts,
  TSelectedUsers,
} from '@store/table/selectedItem/type';
import { TTaskType } from '@store/type';
import { useCallback } from 'react';

import { useDeleteProduct } from './useDeleteProduct';
import { useDeleteTask } from './useDeleteTask';
import { useDeleteUser } from './useDeleteUser';

export function useDeleteController() {
  const deleteTask = useDeleteTask();
  const deleteProduct = useDeleteProduct();
  const deleteUser = useDeleteUser();
  const checkSelected = useCheckIsSelect();

  return useCallback(
    (
      itemType: keyof TSelectedItems,
      itemName: TTaskType | TSelectedProducts | TSelectedUsers,
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
          case 'users':
            deleteUser(checkResult.itemId);
            break;
          default:
        }
      }
    },
    [],
  );
}
