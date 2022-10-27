import { FC, ReactNode } from 'react';
import { IHeaderBlockProps } from '../types';
import Floor from './Floor';
import HeaderFloor from './HeaderFloor';

const HeaderBlock: FC<IHeaderBlockProps> = ({ floors }) => {
	return (
		<>
			<div
				className='map__block'
				style={{ gridTemplateRows: `repeat(${floors.length + 1}, 5rem` }}
			>
				<HeaderFloor key={Math.random()} index={0} />
				{floors.map((_, index) => (
					<HeaderFloor key={index} index={index + 1} />
				))}
			</div>
		</>
	);
};

export default HeaderBlock;
export {};
