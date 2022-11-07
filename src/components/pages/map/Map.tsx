import './style.scss';

import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';

import { useRootStore } from '../../../utils/RootStoreProvider/useRootStore';
import Map from '../../blocks/map/Map';

const MapPage: FC = observer(() => {
  const { storeFormState } = useRootStore();

  useEffect(() => {
    storeFormState.isSelectedMap = false;
  }, [storeFormState]);

  return (
    <main className='map'>
      <Map />
    </main>
  );
});

export default MapPage;
