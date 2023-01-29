import './style.scss';

import Loader from '@components/loader/Loader';
import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { useGetSelects } from '@hooks/product/useGetSelects';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

const PopupFilter: FC = () => {
  const { storeProduct, storeState } = useRootStore();
  const getSelectsHook = useGetSelects();

  function hidePopupFilterHandler() {
    storeState.interface.hidePopupFilter();
  }

  return storeProduct.status.get('fetch') === 'done' ? (
    <div className='popup-filter'>
      {getSelectsHook()}
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