import './style.scss';

import { observer } from 'mobx-react-lite';
import { FC, ReactNode, useEffect } from 'react';

import { useRootStore } from '../../../../utils/RootStoreProvider/useRootStore';
import Loader from '../../../blocks/loader/Loader';
import PointsBlock from '../../../blocks/points/block/Block';
import WindowHeader from '../../../blocks/windowHeader/WindowHeader';

const PopupSelectPoints: FC = observer(() => {
  const { storePopup, storePoint, storeForm } = useRootStore();

  function saveHandler() {
    storePopup.showTaskForm();
    storePopup.hideSelectPoints();
  }

  function closeHandler() {
    storePopup.showTaskForm();
    storePopup.hideSelectPoints();
    storeForm.task.array.clearArrays('points');
    storePoint.fetch.points();
  }

  function displayPointsByTaskType(): ReactNode {
    const PointNodes: ReactNode[] = [];

    let pointsArray = storePoint.state.points.acceptance;
    if (storeForm.state.currentTaskType === 'shipment') {
      pointsArray = storePoint.state.points.shipment;
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
    storeForm.state.isSelectedPoint = true;
    if (storePoint.status.get('fetch') === 'pending') {
      storePoint.fetch.points();
    }
  }, [storePoint.status.get('fetch')]);

  return (
    <div className='popup select-points'>
      <WindowHeader
        text={`Выбрать точки ${
          storeForm.state.currentTaskType === 'acceptance'
            ? 'приёмки'
            : 'отгрузки'
        }`}
        saveEvent={saveHandler}
        closeEvent={closeHandler}
      />

      <div className='points-map'>
        {storePoint.status.get('fetch') === 'done' ? (
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
