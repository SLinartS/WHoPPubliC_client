import { FC } from 'react';
import { IHeaderFloorProps } from './type';

const HeaderFloor: FC<IHeaderFloorProps> = ({ index }) => (
  <div className='map__floor map__floor--title'>{index !== 0 && index}</div>
);

export default HeaderFloor;
export {};
