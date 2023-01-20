import { useCallback } from 'react';

import {
  TSelectedItems,
  TSelectedProducts,
} from '../../../store/table/selectedItem/type';
import { TTaskType } from '../../../store/type';
import { useRootStore } from '../../../utils/RootStoreProvider/useRootStore';

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
    ): IReturnCheckIsSelect => {
      const itemId = storeTable.selectedItem.getItemId(itemType, itemName);
      if (itemId === 0) {
        storePopup.windows.information.setting = {
          text: 'Выберите строку, чтобы её удалить',
        };
        storePopup.status.show('windowInformation');
        return { result: false, itemId };
      }
      return { result: true, itemId };
    },
    [],
  );
}
