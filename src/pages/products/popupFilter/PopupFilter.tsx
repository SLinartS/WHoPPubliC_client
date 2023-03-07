import './style.scss';

import LoaderWrapper from '@components/loader/wrapper/Wrapper';
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

  return (
    <LoaderWrapper status={storeProduct.status.get('fetch')}>
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
    </LoaderWrapper>
  );
};

export default observer(PopupFilter);
