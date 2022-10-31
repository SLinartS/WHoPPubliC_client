import { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import './style.scss';
import Map from '../../blocks/map/Map';
import { useRootStore } from '../../../utils/RootStoreProvider/useRootStore';

const MapPage: FC = observer(() => {
  const { mapStore } = useRootStore();

  useEffect(() => {
    mapStore.isSelectedMap = false;
  }, [mapStore]);

  return (
    <main className='map'>
      <Map />
    </main>
  );
});

export default MapPage;
