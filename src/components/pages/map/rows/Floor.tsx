import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { IFloorProps } from '../types';

const Floor: FC<IFloorProps> = observer(({ id }) => {
	return <div className={'map__floor'} data-floor-id={id}></div>;
});

export default Floor;
