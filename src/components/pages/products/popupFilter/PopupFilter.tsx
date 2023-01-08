import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { useRootStore } from '../../../../utils/RootStoreProvider/useRootStore';
import Loader from '../../../blocks/loader/Loader';
import SelectTable from '../../../blocks/selectTable/SelectTable';

const PopupFilter: FC = observer(() => {
  const { storeProduct, storeTable, storeState } = useRootStore();

  function hidePopupFilterHandler() {
    storeState.interface.hidePopupFilter();
  }

  return storeProduct.status.get('fetch') === 'done' ? (
    <div className='popup-filter'>
      {Object.entries(
        storeProduct.state.products.data[
          storeTable.selectedItem.getItemId('products') - 1
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
});

export default PopupFilter;
