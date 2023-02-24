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
      storeMap.action.fetch('');
    }
  }, [storeMap.status.get('fetch')]);

  function searchHandler(newValue: string) {
    storeMap.action.fetch(newValue);
  }

  return (
    <main className='map'>
      <div className='map__search'>
        <SearchField searchHandler={searchHandler} />
      </div>
      {storeMap.status.get('fetch') === 'pending' ? (
        <Loader classes='loader--map' />
      ) : (
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
      )}
    </main>
  );
};

export default observer(MapPage);
