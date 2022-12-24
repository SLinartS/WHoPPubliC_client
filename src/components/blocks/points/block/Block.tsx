import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import Point from '../point/Point';

interface IPointsBlockProps {
  id: number;
  text: string;
  index: number;
}

const PointsBlock: FC<IPointsBlockProps> = observer(({ id, text, index }) => {
  return (
    <div
      className='points-map__points-block'
      data-point-id={id}
      data-point-index={index}
    >
      <Point id={id} />
      <p className='points-map__title'>{text}</p>
    </div>
  );
});

export default PointsBlock;
