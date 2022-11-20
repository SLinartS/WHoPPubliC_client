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
        article: product.fields.article.value,
        title: product.fields.title.value,
        author: product.fields.author.value,
        categoryId: product.fields.categoryId.value,
        number: product.fields.number.value,
        printingHouse: product.fields.printingHouse.value,
        publishingHouse: product.fields.publishingHouse.value,
      });
    });

    return productListForTable;
  }, [storeForm.product.list.list]);

  return internalCallback;
};

export default useGetProductListForTable;
