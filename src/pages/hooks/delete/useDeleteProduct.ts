import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { useCallback } from 'react';

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
