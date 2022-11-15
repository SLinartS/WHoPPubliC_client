import './style.scss';

import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';

import { useRootStore } from '../../../../utils/RootStoreProvider/useRootStore';
import Loader from '../../../blocks/loader/Loader';
import Map from '../../../blocks/map/Map';
import WindowHeader from '../../../blocks/windowHeader/WindowHeader';

const PopupSelectMap: FC = observer(() => {
  const [background, setBackground] = useState<string>('background: ');

  const { storePopup, storeMap, storeForm } = useRootStore();

  function saveHandler() {
    storePopup.showTaskForm();
    storePopup.hideSelectMap();
  }

  function closeHandler() {
    storePopup.showTaskForm();
    storePopup.hideSelectMap();
    storeForm.task.array.clearArrays('warehousePoints');
    storeMap.fetch.map();
  }

  useEffect(() => {
    storeForm.state.isSelectedMap = true;
  }, []);

  useEffect(() => {
    let backgroundColor: string = '#d35f48';
    if (storeForm.task.utils.isEnoughFreeSpace()) {
      backgroundColor = '#7fa89c';
    }
    setBackground(backgroundColor);
  }, [storeForm.task.utils.isEnoughFreeSpace()]);

  useEffect(() => {
    if (storeMap.status.get('fetch') === 'pending') {
      storeMap.fetch.map();
    }
  }, [storeMap.status.get('fetch')]);

  return (
    <div className='popup select-map'>
      <WindowHeader
        text='Выбрать раскладки на складе'
        saveEvent={saveHandler}
        closeEvent={closeHandler}
      />
      <div
        className='select-map__free-space-indicator'
        style={{ background }}
      />
      {storeMap.status.get('fetch') === 'done' ? (
        <Map additionalClasses='map--select-map' />
      ) : (
        <Loader />
      )}
    </div>
  );
});

export default PopupSelectMap;
