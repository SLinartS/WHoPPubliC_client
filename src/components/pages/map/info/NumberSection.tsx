import { observer } from 'mobx-react-lite';
import { forwardRef } from 'react';
import { IInfoElementProps } from '../types';

const NumberSection = observer(
	forwardRef<HTMLParagraphElement, IInfoElementProps>(({ fontSize }, ref) => {
		return (
			<p
				ref={ref}
				className='map__section-title'
				style={{
					fontSize: fontSize + 'rem',
				}}
			>
				{1}
			</p>
		);
	}),
);

export default NumberSection;
