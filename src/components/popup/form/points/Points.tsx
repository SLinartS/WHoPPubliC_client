import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';

import { useRootStore } from '../../../../utils/RootStoreProvider/useRootStore';
import Loader from '../../../blocks/loader/Loader';
import Points from '../../../blocks/points/Points';
import WindowHeaderForm from '../../../blocks/windowHeader/form/Form';

const PopupFormPoints: FC = observer(() => {
  const { storePopup, storePoint, storeForm } = useRootStore();

  function saveHandler() {
    storePopup.showProductForm();
    storePopup.hideSelectPoints();
  }

  function closeHandler() {
    storePopup.showProductForm();
    storePopup.hideSelectPoints();
    storeForm.product.array.clearArrays('points');
    storePoint.fetch.points();
  }

  useEffect(() => {
    storeForm.state.isSelectedPoint = true;
    if (storePoint.status.get('fetch') === 'pending') {
      storePoint.fetch.points();
    }
  }, [storePoint.status.get('fetch')]);

  return (
    <div className='popup popup--form popup--form-select'>
      <WindowHeaderForm
        title={`Выбрать точки ${
          storeForm.state.currentTaskType === 'acceptance'
            ? 'приёмки'
            : 'отгрузки'
        }`}
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

export default PopupFormPoints;
