import { useCallback } from 'react';

import { IProductFormDataFields } from '../../../../store/popup/form/product/type';
import { useRootStore } from '../../../../utils/RootStoreProvider/useRootStore';
import { useCheckIsSelect } from '../useCheckIsSelect';

export function useChangeProduct() {
  const { storePopup, storeProduct } = useRootStore();
  const checkSelected = useCheckIsSelect();

  return useCallback(() => {
    const warningText = 'Выберите строку, чтобы изменить партию продуктов';
    const checkResult = checkSelected('products', 'products', warningText);
    if (checkResult.result) {
      storeProduct.fetch.oneProduct(checkResult.itemId, () => {
        storePopup.status.show('formProduct', () => {
          const { productInfo } = storeProduct.state.product;
          const { pointId } = storeProduct.state.product;

          Object.entries(productInfo).forEach(([key, element]) => {
            if (key !== 'categoryTitle') {
              const typedKey = key as keyof IProductFormDataFields;
              storePopup.form.product.setFormField(
                typedKey,
                String(element.value),
              );
            }
          });

          storePopup.select.points.clear();
          storePopup.select.points.addItem(pointId);
        });
      });
    }
  }, []);
}
