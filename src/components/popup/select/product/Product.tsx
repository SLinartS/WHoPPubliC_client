import { observer } from 'mobx-react-lite';
import React, { FC, useEffect } from 'react';

import { useRootStore } from '../../../../utils/RootStoreProvider/useRootStore';
import Loader from '../../../blocks/loader/Loader';
import Table from '../../../blocks/table/Table';
import { ITableObject } from '../../../blocks/table/type';
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
    let data: ITableObject[] = [];
    const currentTypeOfTask = storeState.interface.getCurrentTypeOfTask();
    if (currentTypeOfTask === 'acceptance') {
      data = storePopup.form.utils.utils.getProductWithoutLinkToFloor();
    } else {
      data = storePopup.form.utils.utils.getActualProductWithLinkToFloor();
    }
    return (
      <Table
        data={data}
        keyWord='author'
        valuesType='products'
        selectingValues='products'
        displayedColumns={storeTable.utils.getColumnsWithMark('products')}
        classes='table--add-task'
      />
    );
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
