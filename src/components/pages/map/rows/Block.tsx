import { FC, ReactNode } from 'react';
import { IBlockProps } from '../types';
import Floor from './Floor';
import HeaderFloor from './HeaderFloor';

const Block: FC<IBlockProps> = ({ id, index, floors }) => {
	return (
		<div
			className='map__block'
			style={{ gridTemplateRows: `repeat(${floors.length + 1}, 5rem` }}
			data-block-id={id}
		>
			<HeaderFloor index={index} />

			{floors.map((floor, index) => (
				<Floor key={floor.id} id={floor.id} index={index} />
			))}
		</div>
	);
};

export default Block;
