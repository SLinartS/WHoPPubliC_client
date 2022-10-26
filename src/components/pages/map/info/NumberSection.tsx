import { observer } from 'mobx-react-lite';
import { forwardRef } from 'react';
import { ISectionNumber } from '../types';

const NumberSection = observer(
	forwardRef<HTMLParagraphElement, ISectionNumber>(
		({ fontSize, topOffset, rightOffset }, ref) => {
			return (
				<p
					ref={ref}
					className='map__section-title'
					style={{
						fontSize: fontSize + 'rem',
						top: topOffset + 'rem',
						right: -rightOffset + 'rem',
					}}
				>
					{1}
				</p>
			);
		},
	),
);

export default NumberSection;
