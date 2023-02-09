import '../style.scss';
import '../../style.scss';

import Loader from '@components/loader/Loader';
import PointsMap from '@components/points/PointsMap';
import WindowHeaderForm from '@components/windowHeader/form/Form';
import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { TPointType } from '@store/type';
import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';

const PopupSelectPoints: FC = () => {
  const { storePopup, storePoint, storeState } = useRootStore();

  function closeHandler() {
    storePopup.form.state.isInProductForm = false;
    storePopup.status.hide('selectPoints');
    storePopup.select.points.clear();
    storePoint.action.fetch();
  }

  function saveHandler() {
    storePopup.status.hide('selectPoints');
  }

  function getPointType(): TPointType {
    switch (storeState.interface.currentTypeOfTask) {
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
      storePoint.action.fetch();
    }
  }, [storePoint.status.get('fetch')]);

  return (
    <>
      <WindowHeaderForm
        title={`Выбрать точки ${
          storeState.interface.currentTypeOfTask === 'acceptance'
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
    </>
  );
};

export default observer(PopupSelectPoints);
