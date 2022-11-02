import './style.scss';

import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';

import { useRootStore } from '../../../utils/RootStoreProvider/useRootStore';
import Map from '../../blocks/map/Map';

const MapPage: FC = observer(() => {
  const { storeMap } = useRootStore();

  useEffect(() => {
    storeMap.isSelectedMap = false;
  }, [storeMap]);

  return (
    <main className='map'>
      <Map />
    </main>
  );
});

export default MapPage;
