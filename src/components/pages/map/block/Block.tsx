import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import Floor from '../floor/Floor';
import HeaderFloor from '../floor/HeaderFloor';
import { IBlockProps } from './type';

const Block: FC<IBlockProps> = observer(({ id, number, floors, index }) => (
  <div
    className='map__block'
    style={{ gridTemplateRows: `repeat(${floors.length + 1}, 5rem` }}
    data-block-id={id}
    data-block-index={index}
  >
    <HeaderFloor index={number} />

    {floors.map((floor, floorIndex) => (
      <Floor
        key={floor.id}
        id={floor.id}
        active={floor.active}
        number={floor.number}
        index={floorIndex}
      />
    ))}
  </div>
));

export default Block;
