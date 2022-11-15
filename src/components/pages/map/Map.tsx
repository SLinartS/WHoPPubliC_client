import './style.scss';

import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';

import { useRootStore } from '../../../utils/RootStoreProvider/useRootStore';
import Loader from '../../blocks/loader/Loader';
import Map from '../../blocks/map/Map';

const MapPage: FC = observer(() => {
  const { storeForm, storeMap } = useRootStore();

  useEffect(() => {
    storeForm.state.isSelectedMap = false;
  }, []);

  useEffect(() => {
    if (storeMap.status.get('fetch') === 'pending') {
      storeMap.fetch.map();
    }
  }, [storeMap.status.get('fetch')]);

  return (
    <main className='map'>
      {storeMap.status.get('fetch') === 'done' ? <Map /> : <Loader />}
    </main>
  );
});

export default MapPage;
