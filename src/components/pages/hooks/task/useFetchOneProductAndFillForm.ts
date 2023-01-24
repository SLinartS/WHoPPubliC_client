import { useCallback } from 'react';

import { TPopups } from '../../../../store/popup/status/type';
import { useRootStore } from '../../../../utils/RootStoreProvider/useRootStore';
import { useCheckIsSelect } from '../useCheckIsSelect';

export function useFetchOneProductAndFillForm() {
  const { storeProduct, storePopup } = useRootStore();
  const checkSelected = useCheckIsSelect();

  return useCallback(
    (openingWindow: TPopups, warningText: string, isView = false) => {
      const checkResult = checkSelected('products', 'products', warningText);
      if (checkResult.result) {
        storeProduct.fetch.oneProduct(checkResult.itemId, () => {
          const { pointId, productInfo } = storeProduct.state.product;

          const {
            id,
            article,
            author,
            categoryId,
            number,
            printDate,
            printingHouse,
            publishingHouse,
            title,
            yearOfPublication,
          } = productInfo;

          const { product } = storePopup.form;

          product.setFormField('id', String(id.value));
          product.setFormField('article', article.value);
          product.setFormField('author', author.value);
          product.setFormField('categoryId', String(categoryId.value));
          product.setFormField('number', String(number.value));
          product.setFormField('printDate', printDate.value);
          product.setFormField('printingHouse', printingHouse.value);
          product.setFormField('publishingHouse', publishingHouse.value);
          product.setFormField('title', title.value);
          product.setFormField('yearOfPublication', yearOfPublication.value);

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
