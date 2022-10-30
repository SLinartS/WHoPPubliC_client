import { FC } from 'react';
import { useRootStore } from '../../../utils/RootStoreProvider/useRootStore';
import Button from '../../blocks/button/Button';
import WindowHeader from '../../blocks/windowHeader/WindowHeader';
import Map from '../../pages/map/Map';
import './style.scss';

const SelectMap: FC = () => {
  const { popupStore } = useRootStore();

  function hideSelectMapHandler() {
    popupStore.hideSelectMap();
  }

  return (
    <div className='select-map'>
      <WindowHeader text='Добавить задачу приёмки'>
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
