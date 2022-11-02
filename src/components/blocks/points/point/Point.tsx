import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { useRootStore } from '../../../../utils/RootStoreProvider/useRootStore';
import { IPointShellProps } from './type';

const Point: FC<IPointShellProps> = observer(({ active }) => {
  const { pointStore } = useRootStore();

  return (
    <div
      className='points-map__point'
      style={{
        backgroundColor: active && pointStore.isSelectedPoint ? '#c15943' : '',
      }}
    />
  );
});

export default Point;
