import { FC } from 'react';
import HeaderFloor from '../floor/HeaderFloor';
import { IHeaderBlockProps } from './type';


const HeaderBlock: FC<IHeaderBlockProps> = ({ floors }) => {
	return (
		<>
			<div
				className='map__block'
				style={{ gridTemplateRows: `repeat(${floors.length + 1}, 5rem` }}
			>
				<HeaderFloor index={0} />
				{floors.map((_, index) => (
					<HeaderFloor key={index} index={index + 1} />
				))}
			</div>
		</>
	);
};

export default HeaderBlock;
export {};
