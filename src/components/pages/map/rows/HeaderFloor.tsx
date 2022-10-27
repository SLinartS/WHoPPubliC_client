import { FC } from 'react';
import { IHeaderFloorProps } from '../types';

const HeaderFloor: FC<IHeaderFloorProps> = ({ index }) => {
	return <div className='map__floor map__floor--title'>{index !== 0 && index}</div>;
};

export default HeaderFloor;
export {};
