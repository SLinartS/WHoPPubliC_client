import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { IProductFormDataFields } from '@store/popup/form/product/type';
import { TPopups } from '@store/popup/status/type';
import { useCallback } from 'react';

import { useCheckIsSelect } from '../useCheckIsSelect';

export function useFetchOneProductAndFillForm() {
  const { storeProduct, storePopup } = useRootStore();
  const checkSelected = useCheckIsSelect();

  return useCallback(
    (openingWindow: TPopups, warningText: string, isView = false) => {
      const checkResult = checkSelected('products', 'products', warningText);
      if (checkResult.result) {
        storeProduct.action.show(checkResult.itemId, () => {
          const { pointId, productInfo } = storeProduct.state.product;

          Object.entries(productInfo).forEach(([key, element]) => {
            if (key !== 'categoryTitle') {
              const typedKey = key as keyof IProductFormDataFields;
              storePopup.form.product.setFormField(
                typedKey,
                String(element.value),
              );
            }
          });

          if (!isView) {
            storePopup.select.points.values = [pointId];
          }

          storePopup.status.show(openingWindow);
        });
      }
    },
    [],
  );
}
