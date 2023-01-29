import './style.scss';

import gearIcon from '@assets/icons/gear.svg';
import ButtonIcon from '@components/buttonIcon/ButtonIcon';
import Loader from '@components/loader/Loader';
import Map from '@components/map/Map';
import SearchField from '@components/searchField/SearchField';
import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';

const MapPage: FC = () => {
  const { storeMap, storePopup } = useRootStore();
  const [editMap, setEditMap] = useState<boolean>(false);

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
      {storeMap.status.get('fetch') === 'done' ? (
        <div className='map__container'>
          <ButtonIcon
            src={gearIcon}
            clickHandler={() => {
              setEditMap(!editMap);
            }}
            classes='map__edit-button'
          />
          <Map isEditZoneButton={editMap} />
        </div>
      ) : (
        <Loader classes='loader--map' />
      )}
    </main>
  );
};

export default observer(MapPage);
