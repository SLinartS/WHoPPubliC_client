import { FC, ReactNode } from 'react';
import { IBlockProps } from '../types';
import Floor from './Floor';
import HeaderFloor from './HeaderFloor';

const Block: FC<IBlockProps> = ({ id, floorsNumber }) => {
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

export default Block;
