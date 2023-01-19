import { observer } from 'mobx-react-lite';
import { FC, ReactNode, useEffect } from 'react';

import forwardIcon from '../../../../assets/icons/forward.svg';
import { useRootStore } from '../../../../utils/RootStoreProvider/useRootStore';
import Map from '../../../blocks/map/Map';
import PointsMap from '../../../blocks/points/PointsMap';
import WindowHeaderForm from '../../../blocks/windowHeader/form/Form';
import { localViewLocationState } from './state';
import { TInformationOfViewLocation } from './type';
import { useGetButtonByTypeOfOpenedTask } from './useGetButtonByTypeOfOpenedTask';

const PopupViewLocation: FC = observer(() => {
  const { storePoint, storeMap, storePopup } = useRootStore();

  const { first, second } = useGetButtonByTypeOfOpenedTask();

  function closeHandler() {
    storePopup.status.hide('viewLocation');
    storePopup.status.show('viewTask');
  }

  function changeTypeInfomationHandler(newType: TInformationOfViewLocation) {
    localViewLocationState.setTypeOfInformation(newType);
  }

  function displayTable(): ReactNode {
    switch (localViewLocationState.getTypeOfInformation()) {
      case 'acceptancePoint':
        return (
          <PointsMap
            pointsType='acceptance'
            classes='points-map--view-points'
          />
        );
      case 'shipmentPoint':
        return (
          <PointsMap
            pointsType='shipment'
            classes='points-map--view-points'
          />
        );
      case 'floors':
        return <Map classes='map-block--oneColumn' />;
      default:
        return <Map classes='map-block--oneColumn' />;
    }
  }

  useEffect(() => {
    localViewLocationState.setTypeOfInformation(first.type);
  }, []);
  useEffect(() => {
    if (storePoint.status.get('fetch') === 'pending') {
      storePoint.fetch.points();
    }
  }, [storePoint.status.get('fetch')]);
  useEffect(() => {
    if (storeMap.status.get('fetch') === 'pending') {
      storeMap.fetch.map();
    }
  }, [storeMap.status.get('fetch')]);

  return (
    <div className='popup popup__popup-view popup-view popup-view'>
      <WindowHeaderForm
        title='Расположение товара'
        closeEventHandler={closeHandler}
      />
      <div className='popup-view__content-block popup-view__content-block--view-location'>
        <div className='popup-view__switch-block'>
          <button
            className='popup-view__switch'
            type='button'
            onClick={() => changeTypeInfomationHandler(first.type)}
          >
            {first.text}
          </button>
          <img
            className='popup-view__switch-icon'
            src={forwardIcon}
            alt='forward'
          />
          <button
            className='popup-view__switch'
            type='button'
            onClick={() => changeTypeInfomationHandler(second.type)}
          >
            {second.text}
          </button>
        </div>
        <div className='popup-view__table-block popup-view__table-block--view-location'>
          {displayTable()}
        </div>
      </div>
    </div>
  );
});

export default PopupViewLocation;
