import './style.scss';

import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';

import { useRootStore } from '../../../utils/RootStoreProvider/useRootStore';
import Loader from '../../blocks/loader/Loader';
import Map from '../../blocks/map/Map';

const MapPage: FC = observer(() => {
  const { storeFormState, storeMap } = useRootStore();

  useEffect(() => {
    storeFormState.isSelectedMap = false;
  }, []);

  useEffect(() => {
    if (storeMap.statusFetchMap === 'pending') {
      storeMap.fetchMap();
    }
  }, [storeMap.statusFetchMap]);

  return (
    <main className='map'>
      {storeMap.statusFetchMap === 'done' ? <Map /> : <Loader />}
    </main>
  );
});

export default MapPage;
