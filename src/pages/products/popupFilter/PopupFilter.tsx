import './style.scss';

import Loader from '@components/loader/Loader';
import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { useGetSelects } from '@hooks/product/useGetSelects';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

const PopupFilter: FC = () => {
  const { storeProduct, storeState } = useRootStore();
  const getSelects = useGetSelects();

  function hidePopupFilterHandler() {
    storeState.interface.hidePopupFilter();
  }

  return storeProduct.status.get('fetch') === 'done' ? (
    <div className='popup-filter'>
      <button
        className='popup-filter__button'
        type='button'
        onClick={hidePopupFilterHandler}
      >
        Показать
      </button>
      {getSelects()}
    </div>
  ) : (
    <Loader />
  );
};

export default observer(PopupFilter);
