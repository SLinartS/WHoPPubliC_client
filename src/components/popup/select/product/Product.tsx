import { observer } from 'mobx-react-lite';
import React, { FC, useEffect } from 'react';

import { useRootStore } from '../../../../utils/RootStoreProvider/useRootStore';
import Loader from '../../../blocks/loader/Loader';
import Table from '../../../blocks/table/Table';
import WindowHeaderForm from '../../../blocks/windowHeader/form/Form';

const PopupSelectProduct: FC = observer(() => {
  const { storeProduct, storePopup, storeTable } = useRootStore();

  function saveHandler() {
    if (storeTable.selectedItem.getItemId('products') === 0) {
      storePopup.windows.information.setting = {
        text: 'Выберите продукт для добавления',
      };
      storePopup.status.showWindowInformation();
    } else {
      storePopup.select.products.addProductToList();
      storeTable.selectedItem.setItemId('products', 0);
      storePopup.status.hideSelectProducts();
      storePopup.status.showTaskForm();
    }
  }

  function closeHandler() {
    storePopup.status.hideSelectProducts();
    storePopup.status.showTaskForm();
  }

  useEffect(() => {
    if (storeProduct.status.get('fetch') === 'pending') {
      storeProduct.fetch.products();
    }
  }, []);

  return (
    <div className='popup popup--form popup--form-choise'>
      <WindowHeaderForm
        title='Выбрать раскладки на складе'
        saveEventHandler={saveHandler}
        closeEventHandler={closeHandler}
      />
      <div className='popup--form-choise__table'>
        {storeProduct.status.get('fetch') === 'done' ? (
          <Table
            data={storePopup.form.utils.utils.getFilteredProducts(
              storePopup.form.utils.utils.getUnselectedProducts(),
            )}
            keyWord='author'
            valuesType='products'
            displayedColumns={storeTable.utils.getColumnsWithMark('products')}
            classes='table--add-task'
          />
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
});

export default PopupSelectProduct;
