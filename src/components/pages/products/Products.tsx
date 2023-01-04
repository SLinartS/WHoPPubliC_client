import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';

import { ISelectedItems } from '../../../store/table/selectedItem/type';
import { useRootStore } from '../../../utils/RootStoreProvider/useRootStore';
import Button from '../../blocks/button/Button';
import Loader from '../../blocks/loader/Loader';
import SearchField from '../../blocks/searchField/SearchField';
import Table from '../../blocks/table/Table';

const Products: FC = observer(() => {
  const { storeProduct, storePopup, storeTable } = useRootStore();

  function openProductFormHandler() {
    storePopup.form.state.formActionType = 'create';
    storePopup.status.showProductForm();
  }

  function deleteProduct(itemType: keyof ISelectedItems): void {
    const productId = storeTable.selectedItem.getItemId(itemType);
    if (productId === 0) {
      storePopup.windows.information.setting = {
        text: 'Выберите строку, чтобы её удалить',
      };
      storePopup.status.showWindowInformation();
    } else {
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
  }
  function changeProduct(): void {
    storePopup.form.state.formActionType = 'change';
    const productId = storeTable.selectedItem.getItemId('products');

    if (productId === 0) {
      storePopup.windows.information.setting = {
        text: 'Выберите строку, чтобы её изменить',
      };
      storePopup.status.showWindowInformation();
    } else {
      storeProduct.fetch.oneProduct(productId, () => {
        storePopup.status.showProductForm();
      });
    }
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
          clickHandler={() => changeProduct()}
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
