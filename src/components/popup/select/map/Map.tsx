import './style.scss';

import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';

import { useRootStore } from '../../../../utils/RootStoreProvider/useRootStore';
import Loader from '../../../blocks/loader/Loader';
import Map from '../../../blocks/map/Map';
import WindowHeader from '../../../blocks/windowHeader/WindowHeader';

const PopupSelectMap: FC = observer(() => {
  const { storePopup, storeMap, storeFormState, storeFormTaskArray } =
    useRootStore();

  function saveHandler() {
    storePopup.showTaskForm();
    storePopup.hideSelectMap();
  }

  function closeHandler() {
    storePopup.showTaskForm();
    storePopup.hideSelectMap();
    storeFormTaskArray.clearArrays('warehousePoints');
    storeMap.fetchMap();
  }

  useEffect(() => {
    storeFormState.isSelectedMap = true;
  }, []);

  useEffect(() => {
    if (storeMap.statusFetchMap === 'pending') {
      storeMap.fetchMap();
    }
  }, [storeMap.statusFetchMap]);

  return (
    <div className='popup select-map'>
      <WindowHeader
        text='Выбрать раскладки на складе'
        saveEvent={saveHandler}
        closeEvent={closeHandler}
      />
      {storeMap.statusFetchMap === 'done' ? (
        <Map additionalClasses='map--select-map' />
      ) : (
        <Loader />
      )}
    </div>
  );
});

export default PopupSelectMap;
