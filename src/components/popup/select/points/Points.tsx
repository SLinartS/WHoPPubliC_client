import './style.scss';

import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';

import { useRootStore } from '../../../../utils/RootStoreProvider/useRootStore';
import PointsBlock from '../../../blocks/points/block/Block';
import WindowHeader from '../../../blocks/windowHeader/WindowHeader';

const PopupSelectPoints: FC = observer(() => {
  const { storePopup, storePoint, storeFormState, storeFormTaskArray } =
    useRootStore();

  function saveHandler() {
    storePopup.showTaskForm();
    storePopup.hideSelectPoints();
  }

  function closeHandler() {
    storePopup.showTaskForm();
    storePopup.hideSelectPoints();
    storeFormTaskArray.clearArrays('points');
    storePoint.fetchPoints();
  }

  useEffect(() => {
    storeFormState.isSelectedPoint = true;
    if (storePoint.statusFetchPoints === 'pending') {
      storePoint.fetchPoints();
    }
  }, [storePoint, storeFormState]);

  return (
    <div className='popup select-points'>
      <WindowHeader
        text={`Выбрать точки ${
          storeFormState.currentTaskType === 'acceptance'
            ? 'приёмки'
            : 'отгрузки'
        }`}
        saveEvent={saveHandler}
        closeEvent={closeHandler}
      />

      <div className='points-map'>
        {storeFormState.currentTaskType === 'acceptance' ? (
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
