import { observer } from 'mobx-react-lite';
import { forwardRef } from 'react';
import { ISectionNumberProps } from '../types';

const NumberSection = observer(
	forwardRef<HTMLParagraphElement, ISectionNumberProps>(({ fontSize, index }, ref) => {
		return (
			<p
				ref={ref}
				className='map__section-title'
				style={{
					fontSize: fontSize + 'rem',
				}}
			>
				{index}
			</p>
		);
	}),
);

export default NumberSection;
