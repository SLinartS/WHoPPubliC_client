import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';

import { useRootStore } from '../../../utils/RootStoreProvider/useRootStore';
import Loader from '../../blocks/loader/Loader';
import PointsMap from '../../blocks/points/PointsMap';
import SearchField from '../../blocks/searchField/SearchField';

const Points: FC = observer(() => {
  const { storePoint, storePopup } = useRootStore();

  useEffect(() => {
    storePopup.form.state.isSelectedPoint = false;
  }, []);

  useEffect(() => {
    if (storePoint.status.get('fetch') === 'pending') {
      storePoint.fetch.points();
    }
  }, [storePoint.status.get('fetch')]);

  return (
    <main className='points'>
      <div className='points__search'>
        <SearchField />
      </div>

      <p className='points__title'>Точки приёмки</p>
      <div className='points__block'>
        {storePoint.status.get('fetch') === 'done' ? (
          <PointsMap pointsType='acceptance' />
        ) : (
          <Loader />
        )}
      </div>
      <p className='points__title'>Точки отгрузки</p>
      <div className='points__block'>
        {storePoint.status.get('fetch') === 'done' ? (
          <PointsMap pointsType='shipment' />
        ) : (
          <Loader />
        )}
      </div>
    </main>
  );
});

export default Points;
