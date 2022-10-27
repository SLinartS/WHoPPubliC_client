import { FC } from 'react';
import { IHeaderFloor } from '../types';


const HeaderFloor: FC<IHeaderFloor> = ({ number }) => {
	return <div className='map__title'>{number}</div>;
};

export default HeaderFloor;
