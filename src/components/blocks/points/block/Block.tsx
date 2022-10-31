import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import PointShell from '../shell/Shell';
import { IPointsBlockProps } from './type';

const PointsBlock: FC<IPointsBlockProps> = observer(({ id, text, index }) => {
  return (
    <div className='points-map__points-block' data-point-id={id} data-point-index={index}>
      <PointShell />
      <p className='points-map__title'>{text}</p>
    </div>
  );
});

export default PointsBlock;
