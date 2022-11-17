import './style.scss';

import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';

import { useRootStore } from '../../../utils/RootStoreProvider/useRootStore';
import Loader from '../../blocks/loader/Loader';
import Map from '../../blocks/map/Map';
import Points from '../../blocks/points/Points';
import SearchField from '../../blocks/searchField/SearchField';

const MapPage: FC = observer(() => {
  const { storeForm, storeMap, storePoint } = useRootStore();

  useEffect(() => {
    storeForm.state.isSelectedMap = false;
    storeForm.state.isSelectedPoint = false;
  }, []);

  useEffect(() => {
    if (storeMap.status.get('fetch') === 'pending') {
      storeMap.fetch.map();
    }
    if (storePoint.status.get('fetch') === 'pending') {
      storePoint.fetch.points();
    }
  }, [storeMap.status.get('fetch'), storePoint.status.get('fetch')]);

  return (
    <main className='map'>
      <SearchField />
      <div className='map__container'>
        <p className='map__title'>Точки приёмки</p>
        {storePoint.status.get('fetch') === 'done' ? (
          <Points
            pointsType='acceptance'
            classes='border'
          />
        ) : (
          <Loader />
        )}

        <p className='map__title'>Карта склада</p>
        {storeMap.status.get('fetch') === 'done' ? (
          <Map classes='border' />
        ) : (
          <Loader />
        )}

        <p className='map__title'>Точки отгрузки</p>
        {storePoint.status.get('fetch') === 'done' ? (
          <Points
            pointsType='shipment'
            classes='border'
          />
        ) : (
          <Loader />
        )}
      </div>
    </main>
  );
});

export default MapPage;
