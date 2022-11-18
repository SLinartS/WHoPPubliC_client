import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';

import { useRootStore } from '../../../../utils/RootStoreProvider/useRootStore';
import Loader from '../../../blocks/loader/Loader';
import Map from '../../../blocks/map/Map';
import WindowHeaderForm from '../../../blocks/windowHeader/form/Form';

const PopupFormMap: FC = observer(() => {
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
    if (storeForm.floorSpace.isEnoughFreeSpace()) {
      backgroundColor = '#7fa89c';
    }
    setBackground(backgroundColor);
  }, [storeForm.floorSpace.isEnoughFreeSpace()]);

  useEffect(() => {
    if (storeMap.status.get('fetch') === 'pending') {
      storeMap.fetch.map();
    }
  }, [storeMap.status.get('fetch')]);

  return (
    <div className='popup popup--form popup--form-select'>
      <WindowHeaderForm
        title='Выбрать раскладки на складе'
        saveEvent={saveHandler}
        closeEvent={closeHandler}
        textCloseButton='Сбросить'
      />
      <div
        className='select-map__free-space-indicator'
        style={{ background }}
      />
      {storeMap.status.get('fetch') === 'done' ? (
        <Map classes='map--select-map' />
      ) : (
        <Loader />
      )}
    </div>
  );
});

export default PopupFormMap;
