import './style.scss';

import { FC, useEffect } from 'react';

import { useRootStore } from '../../../../utils/RootStoreProvider/useRootStore';
import Map from '../../../blocks/map/Map';
import WindowHeader from '../../../blocks/windowHeader/WindowHeader';

const PopupSelectMap: FC = () => {
  const { storePopup, storeMap } = useRootStore();

  function closeWindowHandler() {
    storePopup.showTaskForm();
    storePopup.hideSelectMap();
  }

  useEffect(() => {
    storeMap.isSelectedMap = true;
  }, [storeMap]);

  return (
    <div className='select-map'>
      <WindowHeader
        text='Выбрать раскладки на складе'
        saveEvent={closeWindowHandler}
        closeEvent={closeWindowHandler}
      />
      <Map additionalClasses='map--select-map' />
    </div>
  );
};

export default PopupSelectMap;
