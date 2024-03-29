import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import {
  IProductGeneralDataFields,
  TProductVariousDataFieldsWords,
} from '@store/popup/form/product/type';
import { useCallback } from 'react';

export function useGetCheckFieldList() {
  const { storePopup } = useRootStore();
  return useCallback((): (
    | keyof IProductGeneralDataFields
    | TProductVariousDataFieldsWords
  )[] => {
    const standardFields: (keyof IProductGeneralDataFields)[] = [
      'id',
      'title',
      'article',
      'number',
      'note',
      'categoryId',
      'typeId',
    ];
    let additionalFields: TProductVariousDataFieldsWords[] = [];

    switch (storePopup.form.state.productVariantWindow) {
      case 'book':
        additionalFields = [
          'author',
          'yearOfPublication',
          'yearOfPrinting',
          'printingHouse',
          'publishingHouse',
        ];
        break;
      case 'magazine':
        additionalFields = [
          'printingHouse',
          'publishingHouse',
          'dateOfPrinting',
          'regularityId',
          'audienceId',
        ];
        break;

      default:
        break;
    }
    const checkFieldList = [...standardFields, ...additionalFields];
    return checkFieldList;
  }, []);
}
