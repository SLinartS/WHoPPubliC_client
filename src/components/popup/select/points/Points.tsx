import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';

import { TPointType } from '../../../../store/type';
import { useRootStore } from '../../../../utils/RootStoreProvider/useRootStore';
import Loader from '../../../blocks/loader/Loader';
import PointsMap from '../../../blocks/points/PointsMap';
import WindowHeaderForm from '../../../blocks/windowHeader/form/Form';

const PopupSelectPoints: FC = observer(() => {
  const { storePopup, storePoint, storeState } = useRootStore();

  function closeHandler() {
    storePopup.form.state.isInProductForm = false;
    storePopup.status.hide('selectPoints');
    storePopup.select.points.clear();
    storePoint.fetch.points();
  }

  function saveHandler() {
    storePopup.status.hide('selectPoints');
  }

  function getPointType(): TPointType {
    switch (storeState.interface.getCurrentTypeOfTask()) {
      case 'acceptance':
        return 'acceptance';
      case 'shipment':
        return 'shipment';
      default:
        return 'acceptance';
    }
  }

  useEffect(() => {
    storePopup.form.state.isSelectedPoint = true;
    if (storePoint.status.get('fetch') === 'pending') {
      storePoint.fetch.points();
    }
  }, [storePoint.status.get('fetch')]);

  return (
    <div className='popup popup__popup-select popup-select'>
      <WindowHeaderForm
        title={`Выбрать точки ${
          storeState.interface.getCurrentTypeOfTask() === 'acceptance'
            ? 'приёмки'
            : 'отгрузки'
        }`}
        saveEventHandler={saveHandler}
        closeEventHandler={closeHandler}
      />
      {storePoint.status.get('fetch') === 'done' ? (
        <PointsMap
          pointsType={getPointType()}
          classes='points-map--select-points'
        />
      ) : (
        <Loader />
      )}
    </div>
  );
});

export default PopupSelectPoints;
