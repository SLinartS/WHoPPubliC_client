import './style.scss';

import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';

import { useRootStore } from '../../../../utils/RootStoreProvider/useRootStore';
import PointsBlock from '../../../blocks/points/block/Block';
import WindowHeader from '../../../blocks/windowHeader/WindowHeader';

const PopupSelectPoints: FC = observer(() => {
  const { storePopup, storePoint, storeTaskForm } = useRootStore();

  function closeWindowHandler() {
    storePopup.showTaskForm();
    storePopup.hideSelectPoints();
  }

  useEffect(() => {
    storePoint.isSelectedPoint = true;
    if (storePoint.statusFetchPoints === 'pending') {
      storePoint.fetchPoints();
    }
  }, [storePoint]);

  return (
    <div className='select-points'>
      <WindowHeader
        text={`Выбрать точки ${
          storeTaskForm.currentTaskType === 'acceptance'
            ? 'приёмки'
            : 'отгрузки'
        }`}
        saveEvent={closeWindowHandler}
        closeEvent={closeWindowHandler}
      />

      <div className='points-map'>
        {storeTaskForm.currentTaskType === 'acceptance' ? (
          <div className='points-map__container'>
            {storePoint.points.acceptance.map((point, index) => (
              <PointsBlock
                key={point.id}
                id={point.id}
                text={point.title}
                index={index}
                active={point.active}
              />
            ))}
          </div>
        ) : (
          <div className='points-map__container'>
            {storePoint.points.shipment.map((point, index) => (
              <PointsBlock
                key={point.id}
                id={point.id}
                text={point.title}
                index={index}
                active={point.active}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

export default PopupSelectPoints;
