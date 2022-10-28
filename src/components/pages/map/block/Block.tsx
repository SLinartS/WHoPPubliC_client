import { FC } from 'react';
import { IBlock } from '../../../../store/map/type';
import Floor from '../floor/Floor';
import HeaderFloor from '../floor/HeaderFloor';

const Block: FC<IBlock> = ({ id, number, floors }) => {
	return (
		<div
			className='map__block'
			style={{ gridTemplateRows: `repeat(${floors.length + 1}, 5rem` }}
			data-block-id={id}
		>
			<HeaderFloor index={number} />

			{floors.map((floor) => (
				<Floor key={floor.id} id={floor.id} number={floor.number} />
			))}
		</div>
	);
};

export default Block;
