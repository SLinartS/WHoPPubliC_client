import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';

import { useRootStore } from '../../../../utils/RootStoreProvider/useRootStore';

interface IPointProps {
  active: boolean;
}

const Point: FC<IPointProps> = observer(({ active }) => {
  const { storeFormState } = useRootStore();

  return (
    <div
      className='points-map__point'
      style={{
        backgroundColor:
          active && storeFormState.isSelectedPoint ? '#c15943' : '',
      }}
    />
  );
});

export default Point;
