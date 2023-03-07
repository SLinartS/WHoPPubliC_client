import './style.scss';

import gearIcon from '@assets/icons/gear/gear-second.svg';
import ButtonIcon from '@components/buttonIcon/ButtonIcon';
import LoaderWrapper from '@components/loader/wrapper/Wrapper';
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
    storePopup.form.state.isViewMap = false;
  }, []);

  useEffect(() => {
    if (storeMap.status.get('fetch') === 'pending') {
      storeMap.action.fetch('');
    }
  }, []);

  function searchHandler(newValue: string) {
    storeMap.action.fetch(newValue);
  }

  return (
    <main className='map'>
      <div className='map__search'>
        <SearchField searchHandler={searchHandler} />
      </div>
      <LoaderWrapper status={storeMap.status.get('fetch')}>
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
      </LoaderWrapper>
    </main>
  );
};

export default observer(MapPage);
