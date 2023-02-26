import '../style.scss';
import '../../style.scss';

import forwardIcon from '@assets/icons/forward.svg';
import Map from '@components/map/Map';
import PointsMap from '@components/points/PointsMap';
import WindowHeaderForm from '@components/windowHeader/form/Form';
import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { observer } from 'mobx-react-lite';
import { FC, ReactNode, useEffect, useState } from 'react';

import { useGetButtonByTypeOfOpenedTask } from './hooks/useGetButtonByTypeOfOpenedTask';
import { TLocation } from './type';

const PopupViewLocation: FC = () => {
  const { first, second } = useGetButtonByTypeOfOpenedTask();
  const [typeOfLocation, setTypeOfLocation] = useState<TLocation>(first.type);
  const { storePoint, storeMap, storePopup } = useRootStore();

  function closeHandler() {
    storePopup.status.hide('viewLocation');
    storePopup.status.show('viewTask');
  }

  function displayMap(): ReactNode {
    switch (typeOfLocation) {
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
    storePoint.action.fetch();
    storeMap.action.fetch('');
    storePopup.form.state.isViewMap = true;
  }, []);

  return (
    <>
      <WindowHeaderForm
        title='Расположение товара'
        closeEventHandler={closeHandler}
      />
      <div className='popup-view__content-block popup-view__content-block--view-location'>
        <div className='popup-view__switch-block'>
          <button
            className={`popup-view__switch ${
              typeOfLocation === first.type ? 'popup-view__switch--active' : ''
            }`}
            type='button'
            onClick={() => setTypeOfLocation(first.type)}
          >
            {first.text}
          </button>
          <img
            className='popup-view__switch-icon'
            src={forwardIcon}
            alt='forward'
          />
          <button
            className={`popup-view__switch ${
              typeOfLocation === second.type ? 'popup-view__switch--active' : ''
            }`}
            type='button'
            onClick={() => setTypeOfLocation(second.type)}
          >
            {second.text}
          </button>
        </div>
        <div className='popup-view__map-block popup-view__map-block--view-location'>
          {displayMap()}
        </div>
      </div>
    </>
  );
};

export default observer(PopupViewLocation);
