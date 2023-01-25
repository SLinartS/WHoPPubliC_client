import './style.scss';

import Loader from '@components/loader/Loader';
import SelectTable from '@components/selectTable/SelectTable';
import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

const PopupFilter: FC = () => {
  const { storeProduct, storeTable, storeState } = useRootStore();

  function hidePopupFilterHandler() {
    storeState.interface.hidePopupFilter();
  }

  return storeProduct.status.get('fetch') === 'done' ? (
    <div className='popup-filter'>
      {Object.entries(
        storeProduct.state.products.data[
          storeTable.selectedItem.getItemId('products', 'products') - 1
        ],
      ).map(([key, item]) => (
        <SelectTable
          key={key + item.value + item.alias}
          checkMarkValue={key}
          alias={item.alias}
          value={String(item.value)}
          mark='products'
        />
      ))}
      <button
        className='popup-filter__button'
        type='button'
        onClick={hidePopupFilterHandler}
      >
        Показать
      </button>
    </div>
  ) : (
    <Loader />
  );
};

export default observer(PopupFilter);
