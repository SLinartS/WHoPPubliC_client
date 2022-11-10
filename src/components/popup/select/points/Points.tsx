import './style.scss';

import { observer } from 'mobx-react-lite';
import { FC, ReactNode, useEffect } from 'react';

import { useRootStore } from '../../../../utils/RootStoreProvider/useRootStore';
import Loader from '../../../blocks/loader/Loader';
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

  function displayPointsByTaskType(): ReactNode {
    const PointNodes: ReactNode[] = [];

    let pointsArray = storePoint.points.acceptance;
    if (storeFormState.currentTaskType === 'shipment') {
      pointsArray = storePoint.points.shipment;
    }

    pointsArray.forEach((point, index) => {
      PointNodes.push(
        <PointsBlock
          key={point.id}
          id={point.id}
          text={point.title}
          index={index}
          active={point.active}
        />,
      );
    });

    return PointNodes;
  }

  useEffect(() => {
    storeFormState.isSelectedPoint = true;
    if (storePoint.statusFetchPoints === 'pending') {
      storePoint.fetchPoints();
    }
  }, [storePoint.statusFetchPoints]);

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
        {storePoint.statusFetchPoints === 'done' ? (
          <div className='points-map__container'>
            {displayPointsByTaskType()}
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
});

export default PopupSelectPoints;
