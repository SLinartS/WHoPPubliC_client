import { FC, useEffect } from 'react';
import { useRootStore } from '../../../utils/RootStoreProvider/useRootStore';
import Button from '../../blocks/button/Button';
import Map from '../../blocks/map/Map';
import WindowHeader from '../../blocks/windowHeader/WindowHeader';
import './style.scss';

const SelectMap: FC = () => {
  const { popupStore, mapStore } = useRootStore();

  function hideSelectMapHandler() {
    popupStore.showAddTaskWindow();
    popupStore.hideSelectMap();
  }

  useEffect(() => {
    mapStore.isSelectedMap = true;
  }, [mapStore]);

  return (
    <div className='select-map'>
      <WindowHeader text='Выбрать раскладки на складе'>
        <Button
          additionalСlasses='button--window-header'
          text='Сохранить'
          onClick={hideSelectMapHandler}
        />
        <Button
          additionalСlasses='button--window-header'
          text='Отмена'
          onClick={hideSelectMapHandler}
        />
      </WindowHeader>
      <Map additionalClasses='map--select-map' />
    </div>
  );
};

export default SelectMap;
