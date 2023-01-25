import '../style.scss';
import '../../style.scss';

import Loader from '@components/loader/Loader';
import Table from '@components/table/Table';
import { ITableObject } from '@components/table/type';
import WindowHeaderForm from '@components/windowHeader/form/Form';
import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';

const PopupSelectProduct: FC = () => {
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
    const { currentTypeOfTask } = storeState.interface;
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
      <div className='popup-select__table'>
        {storeProduct.status.get('fetch') === 'done' ? (
          displayTable()
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default observer(PopupSelectProduct);
