import { observer } from 'mobx-react-lite';
import { FC } from 'react';

interface IMapHeaderFloorProps {
  index: number;
}

const MapHeaderFloor: FC<IMapHeaderFloorProps> = ({ index }) => (
  <div className='map-block__floor map-block__floor--title'>
    {index !== 0 && index}
  </div>
);

export default observer(MapHeaderFloor);
