import { useCallback } from 'react';

import { ITableObject } from '../../components/blocks/table/type';
import { IProductFormFields } from '../../store/popup/form/productList/type';
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
  const { storePopup } = useRootStore();

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

    storePopup.form.productList.list.forEach((product, index) => {
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
  }, [storePopup.form.productList.list]);

  return internalCallback;
};

export default useGetProductListForTable;
