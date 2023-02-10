import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { useCallback } from 'react';

export function useResetForm() {
  const {
    storePopup,
    storeProduct,
    storeTask,
    storePoint,
    storeCategory,
    storeUser,
  } = useRootStore();

  return useCallback(() => {
    storePopup.select.points.clear();
    storePopup.select.floors.clear();
    storePopup.select.floors.clear();
    storePopup.select.products.clear();
    storePopup.form.product.clearFormData();
    storePopup.form.task.clearFormData();
    storePopup.form.user.clearFormData();
    storeProduct.status.set('store', 'pending');
    storeProduct.status.set('fetch', 'pending');
    storeProduct.state.clearProduct();
    storeTask.status.set('store', 'pending');
    storeTask.status.setFetch('acceptance', 'pending');
    storeTask.status.setFetch('intra', 'pending');
    storeTask.status.setFetch('shipment', 'pending');
    storeTask.state.clearTask();
    storeUser.status.set('store', 'pending');
    storeUser.status.set('fetch', 'pending');
    storePoint.status.set('fetch', 'pending');
    storeCategory.status.set('fetch', 'pending');
    storePopup.form.state.isDisplayDefaultErrors = false;
  }, []);
}
