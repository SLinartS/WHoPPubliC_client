import { observer } from 'mobx-react-lite';
import { forwardRef } from 'react';
import { ISectionNumberProps } from '../type';

const NumberSection = observer(
	forwardRef<HTMLParagraphElement, ISectionNumberProps>(({ fontSize, number }, ref) => {
		return (
			<p
				ref={ref}
				className='map__section-title'
				style={{
					fontSize: fontSize + 'rem',
				}}
			>
				{number}
			</p>
		);
	}),
);

export default NumberSection;
