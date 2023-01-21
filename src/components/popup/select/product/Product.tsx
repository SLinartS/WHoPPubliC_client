import { observer } from 'mobx-react-lite';
import React, { FC, useEffect } from 'react';

import { useRootStore } from '../../../../utils/RootStoreProvider/useRootStore';
import Loader from '../../../blocks/loader/Loader';
import Table from '../../../blocks/table/Table';
import WindowHeaderForm from '../../../blocks/windowHeader/form/Form';

const PopupSelectProduct: FC = observer(() => {
  const { storeProduct, storePopup, storeTable, storeState } = useRootStore();

  function saveHandler() {
    if (storeTable.selectedItem.getItemId('products', 'products') === 0) {
      storePopup.windows.information.setting = {
        text: 'Выберите продукт для добавления',
      };
      storePopup.status.show('windowInformation');
    } else {
      storePopup.select.products.addProductToList();
      storeTable.selectedItem.setItemId('products', 'products', 0);
      storePopup.status.hide('selectProducts');
    }
  }

  function closeHandler() {
    storePopup.status.hide('selectProducts');
  }

  function displayTable() {
    switch (storeState.interface.getCurrentTypeOfTask()) {
      case 'acceptance':
        return (
          <Table
            data={storePopup.form.utils.utils.getProductWithoutLinkToFloor()}
            keyWord='author'
            valuesType='products'
            selectingValues='products'
            displayedColumns={storeTable.utils.getColumnsWithMark('products')}
            classes='table--add-task'
          />
        );
      case 'shipment':
      case 'intra':
        return (
          <Table
            data={storePopup.form.utils.utils.getActualProductWithLinkToFloor()}
            keyWord='author'
            valuesType='products'
            selectingValues='products'
            displayedColumns={storeTable.utils.getColumnsWithMark('products')}
            classes='table--add-task'
          />
        );
      default:
        return <p>Ошибка</p>;
    }
  }

  useEffect(() => {
    if (storeProduct.status.get('fetch') === 'pending') {
      storeProduct.fetch.products(() => {
        storeTable.utils.setDefaulMark(
          'products',
          storeProduct.state.products.data,
          [
            'categoryId',
            'printingHouse',
            'yearOfPublication',
            'publishingHouse',
          ],
        );
      });
    }
  }, []);

  return (
    <div className='popup popup__popup-select popup-select'>
      <WindowHeaderForm
        title='Выбрать раскладки на складе'
        saveEventHandler={saveHandler}
        closeEventHandler={closeHandler}
      />
      <div className='popup-select__table--choise-product'>
        {storeProduct.status.get('fetch') === 'done' ? (
          displayTable()
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
});

export default PopupSelectProduct;
