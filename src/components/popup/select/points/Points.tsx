import './style.scss';

import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';

import { useRootStore } from '../../../../utils/RootStoreProvider/useRootStore';
import Loader from '../../../blocks/loader/Loader';
import Points from '../../../blocks/points/Points';
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
        textCloseButton='Сбросить'
      />
      {storePoint.status.get('fetch') === 'done' ? (
        <Points pointsType={storeForm.state.currentTaskType} />
      ) : (
        <Loader />
      )}
    </div>
  );
});

export default PopupSelectPoints;
