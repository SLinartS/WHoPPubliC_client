import { IBlock } from '@store/map/type';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import MapFloor from '../floor/Floor';
import MapHeaderFloor from '../floor/HeaderFloor';

interface IMapBlockProps extends IBlock {
  index: number;
}

const MapBlock: FC<IMapBlockProps> = ({ id, number, floors, index }) => (
  <div
    className='map-block__block'
    style={{ gridTemplateRows: `repeat(${floors.length + 1}, 5rem` }}
    data-block-id={id}
    data-block-index={index}
  >
    <MapHeaderFloor index={number} />

    {floors.map((floor, floorIndex) => (
      <MapFloor
        key={floor.id}
        id={floor.id}
        number={floor.number}
        capacity={floor.capacity}
        freeSpace={floor.freeSpace}
        reservedSpace={floor.reservedSpace}
        index={floorIndex}
      />
    ))}
  </div>
);

export default observer(MapBlock);
