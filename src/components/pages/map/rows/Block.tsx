import React, { FC, ReactNode } from 'react';
import { IBlockComponent } from '../../../../types/map';
import Floor from './Floor';
import HeaderFloor from './HeaderFloor';

const Row: FC<IBlockComponent> = ({ id, floorsNumber }) => {
	function floorsGenerate(id: number, fNumber: number) {
		let floors: Array<ReactNode> = [];

		for (let i: number = fNumber; i >= 0; i--) {
			if (i === 0) {
				floors.push(<HeaderFloor key={i} number={id}/>);
			} else {
				floors.push(<Floor key={Math.random() + id} />);
			}
		}

		return floors;
	}

	return (
		<div
			className='map__block'
			style={{ gridTemplateRows: `repeat(${floorsNumber + 1}, 5rem` }}
		>
			{floorsGenerate(id, floorsNumber)}
		</div>
	);
};

export default Row;
