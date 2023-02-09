import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { useCallback } from 'react';

export function useResetForm() {
  const { storePopup, storeProduct, storeTask, storePoint, storeCategory } =
    useRootStore();

  return useCallback(() => {
    storePopup.select.points.clear();
    storePopup.select.floors.clear();
    storePopup.select.floors.clear();
    storePopup.select.products.clear();
    storePopup.form.product.clearFormData();
    storePopup.form.task.clearFormData();
    storeProduct.status.set('add', 'pending');
    storeProduct.status.set('fetch', 'pending');
    storeProduct.state.clearProduct();
    storeTask.status.set('add', 'pending');
    storeTask.status.setFetch('acceptance', 'pending');
    storeTask.status.setFetch('intra', 'pending');
    storeTask.status.setFetch('shipment', 'pending');
    storeTask.state.clearTask();
    storePoint.status.set('fetch', 'pending');
    storeCategory.status.set('fetch', 'pending');
    storePopup.form.state.isDisplayDefaultErrors = false;
  }, []);
}
