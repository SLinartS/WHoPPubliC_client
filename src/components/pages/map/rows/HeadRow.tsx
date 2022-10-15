import React, { FC } from 'react';
import { IMapHeadRowData } from '../../../../types/map';

const HeadRow: FC<IMapHeadRowData> = ({ number }) => {
	if (number === 0) {
		return <div className='map__title' style={{ opacity: 0 }}></div>;
	}
	return <div className='map__title'>{number}</div>;
};

export default HeadRow;
