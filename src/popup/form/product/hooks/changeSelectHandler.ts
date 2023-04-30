import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { IOption } from '@store/category/type';
import {
  IProductGeneralDataFields,
  TProductVariousDataFieldsWords,
} from '@store/popup/form/product/type';
import { useCallback } from 'react';

export function useChangeSelectHandler() {
  const { storePopup } = useRootStore();
  return useCallback(
    (
      fieldName:
        | keyof IProductGeneralDataFields
        | TProductVariousDataFieldsWords,
      option: IOption,
      actionAfterChange?: () => void,
    ) => {
      storePopup.form.product.setFormField(fieldName, String(option.id));
      if (actionAfterChange) {
        actionAfterChange();
      }
    },
    [],
  );
}
