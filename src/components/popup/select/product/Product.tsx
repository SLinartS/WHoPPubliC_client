import { observer } from 'mobx-react-lite';
import React, { FC, useEffect } from 'react';

import { useRootStore } from '../../../../utils/RootStoreProvider/useRootStore';
import Table from '../../../blocks/table/Table';
import WindowHeaderForm from '../../../blocks/windowHeader/form/Form';

const PopupSelectProduct: FC = observer(() => {
  const { storeProduct, storePopup } = useRootStore();

  function saveHandler() {}

  function closeHandler() {
    storePopup.status.showTaskForm();
    storePopup.status.hideSelectProducts();
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
        saveEvent={saveHandler}
        closeEvent={closeHandler}
        textSaveButton='Добавить'
      />
      <Table
        data={storeProduct.state.products.data}
        keyWord='article'
        tableHeader={storeProduct.state.products.tableHeader}
        valuesType='products'
        classes='table--add-task'
      />
    </div>
  );
});

export default PopupSelectProduct;
