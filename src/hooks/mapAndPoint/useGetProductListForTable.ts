import { useCallback } from 'react';

import { IProductFormDataFields } from '../../store/form/product/field/type';
import { useRootStore } from '../../utils/RootStoreProvider/useRootStore';

interface IProductForTable
  extends Omit<IProductFormDataFields, 'yearOfPublication' | 'printDate'> {}

interface IProductListForTableData {
  data: IProductForTable[];
  tableHeader: string[];
}

const useGetProductListForTable = () => {
  const { storeFormProductList } = useRootStore();

  const internalCallback = useCallback((): IProductListForTableData => {
    const productListForTable: IProductListForTableData = {
      data: [],
      tableHeader: [
        'Артикул',
        'Название',
        'Автор',
        'Категория',
        'Количество',
        'Типография',
        'Издательство',
      ],
    };

    for (const product of storeFormProductList.list) {
      productListForTable.data.push({
        article: product.article,
        title: product.title,
        author: product.author,
        categoryId: product.categoryId,
        number: product.number,
        printingHouse: product.printingHouse,
        publishingHouse: product.publishingHouse,
      });
    }

    return productListForTable;
  }, [storeFormProductList.list]);

  return internalCallback;
};

export default useGetProductListForTable;
