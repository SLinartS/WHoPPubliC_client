import '../style.scss';
import '../../style.scss';

import LoaderWrapper from '@components/loader/wrapper/Wrapper';
import Table from '@components/table/Table';
import { ITableObject } from '@components/table/type';
import WindowHeaderForm from '@components/windowHeader/form/Form';
import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';
import { useGetActualProductWithLinkToFloor } from 'src/popup/hooks/productList/useGetActualProductWithLinkToFloor';
import { useGetProductWithoutLinkToFloor } from 'src/popup/hooks/productList/useGetProductWithoutLinkToFloor';

const PopupSelectProduct: FC = () => {
  const { storeProduct, storePopup, storeTable, storeState } = useRootStore();
  const getProductWithoutLinkToFloor = useGetProductWithoutLinkToFloor();
  const getActualProductWithLinkToFloor = useGetActualProductWithLinkToFloor();

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
      data = getProductWithoutLinkToFloor();
    } else {
      data = getActualProductWithLinkToFloor();
    }
    return (
      <Table
        data={data}
        valuesType='products'
        selectingValues='products'
        displayedColumns={storeTable.utils.getColumnsWithMark('products')}
        classes='table--add-task'
      />
    );
  }

  useEffect(() => {
    if (storeProduct.status.get('fetch') === 'pending') {
      storeProduct.action.fetch('', () => {
        storeTable.utils.setDefaultMark(
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
    <>
      <WindowHeaderForm
        title='Выбрать раскладки на складе'
        saveEventHandler={saveHandler}
        closeEventHandler={closeHandler}
      />
      <div className='popup-select__table'>
        <LoaderWrapper status={storeProduct.status.get('fetch')}>
          {displayTable()}
        </LoaderWrapper>
      </div>
    </>
  );
};

export default observer(PopupSelectProduct);
