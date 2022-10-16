import React, { FC } from 'react';
import { IHeaderFloor } from '../../../../types/map';

const HeaderFloor: FC<IHeaderFloor> = ({ number }) => {
	return <div className='map__title'>{number}</div>;
};

export default HeaderFloor;
