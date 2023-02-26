import { IFloor } from '@store/map/type';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import MapHeaderFloor from '../floor/HeaderFloor';

interface IMapHeaderBlockProps {
  floors: IFloor[];
}

const MapHeaderBlock: FC<IMapHeaderBlockProps> = ({ floors }) => {
  function getBlockHeight() {
    if (window.screen.width < 1000) {
      return '4rem';
    }
    return '5rem';
  }

  return (
    <div
      className='map-block__block'
      style={{
        gridTemplateRows: `repeat(${floors.length + 1}, ${getBlockHeight()}`,
      }}
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
};

export default observer(MapHeaderBlock);
