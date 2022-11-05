import './style.scss';

import { FC, useEffect } from 'react';

import { useRootStore } from '../../../../utils/RootStoreProvider/useRootStore';
import Map from '../../../blocks/map/Map';
import WindowHeader from '../../../blocks/windowHeader/WindowHeader';

const PopupSelectMap: FC = () => {
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
  }, [storeFormState]);

  return (
    <div className='popup select-map'>
      <WindowHeader
        text='Выбрать раскладки на складе'
        saveEvent={saveHandler}
        closeEvent={closeHandler}
      />
      <Map additionalClasses='map--select-map' />
    </div>
  );
};

export default PopupSelectMap;
