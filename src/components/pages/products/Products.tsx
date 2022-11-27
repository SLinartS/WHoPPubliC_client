import './style.scss';

import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';

import { useRootStore } from '../../../utils/RootStoreProvider/useRootStore';
import Button from '../../blocks/button/Button';
import Loader from '../../blocks/loader/Loader';
import SearchField from '../../blocks/searchField/SearchField';
import Table from '../../blocks/table/Table';
import { ISelectedItems } from '../../../store/table/selectedItem/type';

const Products: FC = observer(() => {
  const { storeProduct, storePopup, storeCategory, storeTable } =
    useRootStore();

  function openProductFormHandler() {
    storeCategory.fetch.categories();
    storePopup.status.showProductForm();
  }

  function deleteProduct(itemType: keyof ISelectedItems): void {
    const productId = storeTable.selectedItem.getItemId(itemType);

    storePopup.windows.confirm.setting = {
      title: `Удалить задачу Id:${productId}?`,
      firstButtonEvent: () => {
        storeProduct.delete.product(productId, () => {
          storeProduct.fetch.products();
          storePopup.status.hideWindowConfirm();
        });
      },
      secondButtonEvent: () => {
        storePopup.status.hideWindowConfirm();
      },
    };
    storePopup.status.showWindowConfirm();
  }

  function deleteHandler(itemType: keyof ISelectedItems) {
    switch (itemType) {
      case 'products':
        deleteProduct(itemType);
        break;
      default:
    }
  }

  useEffect(() => {
    if (storeProduct.status.get('fetch') === 'pending') {
      storeProduct.fetch.products();
    }
  }, [storeProduct.status.get('fetch')]);

  return (
    <main className='products'>
      <div className='products__title'>
        <h3 className='products__title-text'>Список товаров</h3>
      </div>
      <SearchField />
      <div className='products__section-button'>
        <Button
          classes='button--products'
          text='Добавить'
          clickHandler={() => openProductFormHandler()}
        />
        <Button
          classes='button--products'
          text='Изменить'
          clickHandler={() => deleteHandler('products')}
        />
        <Button
          classes='button--products'
          text='Удалить'
          clickHandler={() => deleteHandler('products')}
        />
      </div>
      {storeProduct.status.get('fetch') === 'done' ? (
        <Table
          data={storeProduct.state.products.data}
          keyWord='article'
          tableHeader={storeProduct.state.products.tableHeader}
          valuesType='products'
          classes='table--products'
        />
      ) : (
        <Loader />
      )}
    </main>
  );
});

export default Products;
