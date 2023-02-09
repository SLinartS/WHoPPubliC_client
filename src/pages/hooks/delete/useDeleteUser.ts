import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { useCallback } from 'react';

export function useDeleteUser() {
  const { storePopup } = useRootStore();
  return useCallback((productId: number) => {
    storePopup.status.show('windowConfirm', () => {
      storePopup.windows.confirm.setSetting({
        variant: 'deleteUser',
        text: `Удалить пользователя с Id:${productId}?`,
        itemType: 'users',
        itemName: 'users',
        itemId: productId,
      });
    });
  }, []);
}
