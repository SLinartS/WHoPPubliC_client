import { useCallback } from 'react';

import { useRootStore } from '../../../../utils/RootStoreProvider/useRootStore';

export function useDeleteProduct() {
  const { storePopup } = useRootStore();
  return useCallback((productId: number) => {
    storePopup.status.show('windowConfirm', () => {
      storePopup.windows.confirm.setSetting({
        variant: 'deleteProduct',
        text: `Удалить товар Id:${productId}?`,
        itemType: 'products',
        itemName: 'products',
        itemId: productId,
      });
    });
  }, []);
}
