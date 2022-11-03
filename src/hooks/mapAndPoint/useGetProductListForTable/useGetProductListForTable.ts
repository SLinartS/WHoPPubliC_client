import { useCallback } from 'react';

import { IProductFormData } from '../../../store/form/product/type';
import { useRootStore } from '../../../utils/RootStoreProvider/useRootStore';

interface IProductForTable
  extends Omit<IProductFormData, 'yearOfPublication' | 'printDate'> {}

interface IProductListForTableData {
  data: IProductForTable[];
  tableHeader: string[];
}

const useGetProductListForTable = () => {
  const { storeFormProduct } = useRootStore();

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

    for (const product of storeFormProduct.productList) {
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
  }, [storeFormProduct.productList]);

  return internalCallback;
};

export default useGetProductListForTable;
