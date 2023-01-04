import { observer } from 'mobx-react-lite';
import { FC, useCallback, useEffect, useState } from 'react';

import { useRootStore } from '../../../../utils/RootStoreProvider/useRootStore';
import Loader from '../../../blocks/loader/Loader';
import Map from '../../../blocks/map/Map';
import WindowHeaderForm from '../../../blocks/windowHeader/form/Form';

const PopupSelectMap: FC = observer(() => {
  const [background, setBackground] = useState<string>('background: ');

  const { storePopup, storeMap } = useRootStore();

  function saveHandler() {
    storePopup.status.showTaskForm();
    storePopup.status.hideSelectMap();
  }

  function closeHandler() {
    storePopup.status.showTaskForm();
    storePopup.status.hideSelectMap();
    storePopup.select.warehousePoints.clearArray();
    storeMap.fetch.map();
  }

  useEffect(() => {
    storePopup.form.state.isSelectedMap = true;
  }, []);

  const isEnoughFreeSpace = useCallback(() => {
    return storePopup.select.utils.floorSpace.isEnoughFreeSpace();
  }, [storePopup.select.warehousePoints.arrayValue.length]);

  useEffect(() => {
    let backgroundColor: string = '#d35f48';
    if (isEnoughFreeSpace()) {
      backgroundColor = '#7fa89c';
    }
    setBackground(backgroundColor);
  }, [isEnoughFreeSpace]);

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
        className='popup--form-select__free-space-indicator'
        style={{ background }}
      />
      {storeMap.status.get('fetch') === 'done' ? (
        <Map classes='map-block--select-map' />
      ) : (
        <Loader />
      )}
    </div>
  );
});

export default PopupSelectMap;
