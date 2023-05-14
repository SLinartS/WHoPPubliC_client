import '../style.scss';
import '../../style.scss';

import Table from '@components/table/Table';
import WindowHeaderForm from '@components/windowHeader/form/Form';
import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';

const PopupViewMapProducts: FC = () => {
  const { storePopup, storeTable, storeProduct } = useRootStore();

  function closeHandler() {
    storePopup.status.hide('viewMapProducts');
  }

  useEffect(() => {
    storeTable.utils.setDefaultMark(
      'products',
      storeProduct.state.products.data,
      [
        'categoryId',
        'imageUrl',
        'printingHouse',
        'yearOfPublication',
        'publishingHouse',
        'regularityId',
        'audienceId',
        'typeId',
        'author',
        'yearOfPrinting',
        'dateOfPrinting',
      ],
    );
  }, []);

  return (
    <>
      <WindowHeaderForm
        title='Товары на этаже'
        closeEventHandler={closeHandler}
      />

      <div className='popup-view__content-block popup-view__content-block--map-products'>
        <div className='popup-view__table-block popup-view__table-block--map-products'>
          <Table
            data={storePopup.select.products.getProductListData()}
            valuesType='products'
            selectingValues='products'
            displayedColumns={storeTable.utils.getColumnsWithMark('products')}
            classes='table--view-map-products'
          />
        </div>
      </div>
    </>
  );
};

export default observer(PopupViewMapProducts);
