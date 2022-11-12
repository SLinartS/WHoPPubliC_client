import './style.scss';

import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';

import { useRootStore } from '../../../../utils/RootStoreProvider/useRootStore';
import Loader from '../../../blocks/loader/Loader';
import Map from '../../../blocks/map/Map';
import WindowHeader from '../../../blocks/windowHeader/WindowHeader';

const PopupSelectMap: FC = observer(() => {
  const [background, setBackground] = useState<string>('background: ');

  const {
    storePopup,
    storeMap,
    storeFormState,
    storeFormTaskArray,
    storeFormUtils,
  } = useRootStore();

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
    let backgroundColor: string = '#d35f48';
    if (storeFormUtils.isEnoughFreeSpace()) {
      backgroundColor = '#7fa89c';
    }
    setBackground(backgroundColor);
  }, [storeFormUtils.isEnoughFreeSpace()]);

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
      <div
        className='select-map__is-enough-free-space'
        style={{ background }}
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
