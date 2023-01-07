import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';

import { useRootStore } from '../../../utils/RootStoreProvider/useRootStore';
import Loader from '../../blocks/loader/Loader';
import Map from '../../blocks/map/Map';
import SearchField from '../../blocks/searchField/SearchField';

const MapPage: FC = observer(() => {
  const { storeMap, storePopup } = useRootStore();

  useEffect(() => {
    storePopup.form.state.isSelectedMap = false;
  }, []);

  useEffect(() => {
    if (storeMap.status.get('fetch') === 'pending') {
      storeMap.fetch.map();
    }
  }, [storeMap.status.get('fetch')]);

  return (
    <main className='map'>
      <div className='map__search'>
        <SearchField />
      </div>
      <div className='map__container'>
        {storeMap.status.get('fetch') === 'done' ? <Map /> : <Loader />}
      </div>
    </main>
  );
});

export default MapPage;
