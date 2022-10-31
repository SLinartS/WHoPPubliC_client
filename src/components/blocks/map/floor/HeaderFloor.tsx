import { FC } from 'react';
import { IHeaderFloorProps } from './type';

const HeaderFloor: FC<IHeaderFloorProps> = ({ index }) => (
  <div className='map-block__floor map-block__floor--title'>{index !== 0 && index}</div>
);

export default HeaderFloor;
