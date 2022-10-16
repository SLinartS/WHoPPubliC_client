import React, { FC, ReactNode } from 'react';
import { IHeaderBlock } from '../../../../types/map';
import HeaderFloor from './HeaderFloor';

const HeaderBlock: FC<IHeaderBlock> = ({ floorsNumber }) => {
	function floorsGenerate(fNumber: number) {
		let floors: Array<ReactNode> = [];

		for (let i: number = fNumber; i > 0; i--) {
			if (i !== 0) {
				floors.push(<HeaderFloor key={Math.random()} number={i}/>);
			}
		}

		return floors;
	}

	return (
		<>
			<div
				className='map__block'
				style={{ gridTemplateRows: `repeat(${floorsNumber + 1}, 5rem` }}
			>
				{floorsGenerate(floorsNumber)}
			</div>
		</>
	);
};

export default HeaderBlock;
