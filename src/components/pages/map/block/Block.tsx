import { FC } from 'react';
import Floor from '../floor/Floor';
import HeaderFloor from '../floor/HeaderFloor';
import { IBlockProps } from './type';


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
