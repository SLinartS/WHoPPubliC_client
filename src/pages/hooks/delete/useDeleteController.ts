import { useCheckIsSelect } from '@hooks/useCheckIsSelect';
import {
  TSelectedAccounts,
  TSelectedItems,
  TSelectedProducts,
} from '@store/table/selectedItem/type';
import { TTaskType } from '@store/type';
import { useCallback } from 'react';

import { useDeleteAccount } from './useDeleteAccount';
import { useDeleteProduct } from './useDeleteProduct';
import { useDeleteTask } from './useDeleteTask';

export function useDeleteController() {
  const deleteTask = useDeleteTask();
  const deleteProduct = useDeleteProduct();
  const deleteAccount = useDeleteAccount();
  const checkSelected = useCheckIsSelect();

  return useCallback(
    (
      itemType: keyof TSelectedItems,
      itemName: TTaskType | TSelectedProducts | TSelectedAccounts,
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
          case 'accounts':
            deleteAccount(checkResult.itemId);
            break;
          default:
        }
      }
    },
    [],
  );
}
