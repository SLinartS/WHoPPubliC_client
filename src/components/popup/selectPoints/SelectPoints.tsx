import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';
import { useRootStore } from '../../../utils/RootStoreProvider/useRootStore';
import Button from '../../blocks/button/Button';
import PointsBlock from '../../blocks/points/block/Block';
import WindowHeader from '../../blocks/windowHeader/WindowHeader';
import './style.scss';

const SelectPoints: FC = observer(() => {
  const { popupStore, pointStore, addTaskFormStore } = useRootStore();

  function hideSelectMapHandler() {
    popupStore.hideSelectPoints();
  }

  useEffect(() => {
    if (
      pointStore.acceptanceStatus === 'pending' &&
      addTaskFormStore.currentTaskType === 'acceptance'
    ) {
      pointStore.getPoints();
    }
    if (
      pointStore.shipmentStatus === 'pending' &&
      addTaskFormStore.currentTaskType === 'shipment'
    ) {
      pointStore.getPoints();
    }
  }, [pointStore, addTaskFormStore.currentTaskType]);

  return (
    <div className='select-points'>
      <WindowHeader
        text={`Выбрать точки ${
          addTaskFormStore.currentTaskType === 'acceptance'
            ? 'приёмки'
            : 'отгрузки'
        }`}
      >
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
      <div className='points-map'>
        <div className='points-map__container'>
          {pointStore.acceptancePoints.map((point, index) => (
            <PointsBlock
              key={point.id}
              id={point.id}
              text={point.title}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

export default SelectPoints;
