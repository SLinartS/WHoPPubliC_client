import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { useCallback } from 'react';

export function useDeleteAccount() {
  const { storePopup } = useRootStore();
  return useCallback((productId: number) => {
    storePopup.status.show('windowConfirm', () => {
      storePopup.windows.confirm.setSetting({
        variant: 'deleteAccount',
        text: `Удалить пользователя с Id:${productId}?`,
        itemType: 'accounts',
        itemName: 'accounts',
        itemId: productId,
      });
    });
  }, []);
}
