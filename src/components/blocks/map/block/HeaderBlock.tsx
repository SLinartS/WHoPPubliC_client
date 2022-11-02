import { FC } from 'react';

import { IFloor } from '../../../../store/map/type';
import MapHeaderFloor from '../floor/HeaderFloor';

interface IMapHeaderBlockProps {
  floors: Array<IFloor>;
}

const MapHeaderBlock: FC<IMapHeaderBlockProps> = ({ floors }) => (
  <div
    className='map-block__block'
    style={{ gridTemplateRows: `repeat(${floors.length + 1}, 5rem` }}
  >
    <MapHeaderFloor index={0} />
    {floors.map((floor, index) => (
      <MapHeaderFloor
        key={floor.id}
        index={floors.length - index}
      />
    ))}
  </div>
);

export default MapHeaderBlock;
