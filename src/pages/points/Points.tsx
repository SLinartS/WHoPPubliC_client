import './style.scss';

import LoaderWrapper from '@components/loader/wrapper/Wrapper';
import PointsMap from '@components/points/PointsMap';
import SearchField from '@components/searchField/SearchField';
import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';

const Points: FC = () => {
  const { storePoint, storePopup } = useRootStore();

  useEffect(() => {
    storePopup.form.state.isSelectedPoint = false;
  }, []);

  useEffect(() => {
    if (storePoint.status.get('fetch') === 'pending') {
      storePoint.action.fetch();
    }
  }, [storePoint.status.get('fetch')]);

  return (
    <main className='points'>
      <div className='points__search'>
        <SearchField />
      </div>

      <p className='points__title'>Точки приёмки</p>
      <div className='points__block'>
        <LoaderWrapper status={storePoint.status.get('fetch')}>
          <PointsMap pointsType='acceptance' />
        </LoaderWrapper>
      </div>
      <p className='points__title'>Точки отгрузки</p>
      <div className='points__block'>
        <LoaderWrapper status={storePoint.status.get('fetch')}>
          <PointsMap pointsType='shipment' />
        </LoaderWrapper>
      </div>
    </main>
  );
};

export default observer(Points);
