import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';

import { useRootStore } from '../../../../utils/RootStoreProvider/useRootStore';
import Loader from '../../../blocks/loader/Loader';
import Points from '../../../blocks/points/Points';
import WindowHeaderForm from '../../../blocks/windowHeader/form/Form';

const PopupSelectPoints: FC = observer(() => {
  const { storePopup, storePoint } = useRootStore();

  function closeHandler() {
    storePopup.status.showProductForm();
    storePopup.status.hideSelectPoints();
    storePopup.select.points.clearArray();
    storePoint.fetch.points();
  }

  useEffect(() => {
    storePopup.form.state.isSelectedPoint = true;
    if (storePoint.status.get('fetch') === 'pending') {
      storePoint.fetch.points();
    }
  }, [storePoint.status.get('fetch')]);

  return (
    <div className='popup popup--form popup--form-select'>
      <WindowHeaderForm
        title={`Выбрать точки ${
          storePopup.form.state.currentTaskType === 'acceptance'
            ? 'приёмки'
            : 'отгрузки'
        }`}
        closeEvent={closeHandler}
        textCloseButton='Сбросить'
      />
      {storePoint.status.get('fetch') === 'done' ? (
        <Points pointsType={storePopup.form.state.currentTaskType} />
      ) : (
        <Loader />
      )}
    </div>
  );
});

export default PopupSelectPoints;