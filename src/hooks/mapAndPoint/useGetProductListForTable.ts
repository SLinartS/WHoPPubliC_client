import { useCallback } from 'react';

import { ITableObject } from '../../components/blocks/table/type';
import { IProductFormFields } from '../../store/form/product/list/type';
import { useRootStore } from '../../utils/RootStoreProvider/useRootStore';

interface IProductForTable
  extends ITableObject,
    Omit<IProductFormFields, 'yearOfPublication' | 'printDate'> {
  id: number;
}

interface IProductListForTableData {
  data: IProductForTable[];
  tableHeader: string[];
}

const useGetProductListForTable = () => {
  const { storeForm } = useRootStore();

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

    storeForm.product.list.list.forEach((product, index) => {
      productListForTable.data.push({
        id: index,
        article: product.article.value,
        title: product.title.value,
        author: product.author.value,
        categoryId: product.categoryId.value,
        number: product.number.value,
        printingHouse: product.printingHouse.value,
        publishingHouse: product.publishingHouse.value,
      });
    });

    return productListForTable;
  }, [storeForm.product.list.list]);

  return internalCallback;
};

export default useGetProductListForTable;
