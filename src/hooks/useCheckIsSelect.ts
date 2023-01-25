import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import {
  TSelectedItems,
  TSelectedProducts,
} from '@store/table/selectedItem/type';
import { TTaskType } from '@store/type';
import { useCallback } from 'react';

interface IReturnCheckIsSelect {
  result: boolean;
  itemId: number;
}

export function useCheckIsSelect() {
  const { storePopup, storeTable } = useRootStore();
  return useCallback(
    (
      itemType: keyof TSelectedItems,
      itemName: TTaskType | TSelectedProducts,
      warningText: string,
    ): IReturnCheckIsSelect => {
      const itemId = storeTable.selectedItem.getItemId(itemType, itemName);
      if (itemId === 0) {
        storePopup.windows.information.setting = {
          text: warningText,
        };
        storePopup.status.show('windowInformation');
        return { result: false, itemId };
      }
      return { result: true, itemId };
    },
    [],
  );
}
