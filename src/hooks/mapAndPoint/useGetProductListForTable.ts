import { useCallback } from 'react';

import { IProductFormFields } from '../../store/form/product/list/type';
import { useRootStore } from '../../utils/RootStoreProvider/useRootStore';

interface IProductForTable
  extends Omit<IProductFormFields, 'yearOfPublication' | 'printDate'> {}

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
        article: product.article.value,
        title: product.title.value,
        author: product.author.value,
        categoryId: product.categoryId.value,
        number: product.number.value,
        printingHouse: product.printingHouse.value,
        publishingHouse: product.publishingHouse.value,
      });
    }

    return productListForTable;
  }, [storeFormProductList.list]);

  return internalCallback;
};

export default useGetProductListForTable;
