import { observer } from 'mobx-react-lite';
import { forwardRef } from 'react';
import { IZoneLetterProps } from '../types';

const LetterZone = observer(
	forwardRef<HTMLParagraphElement, IZoneLetterProps>(
		({ fontSize, topOffset, leftOffset, zoneLetter }, ref) => {
			return (
				<p
					ref={ref}
					className='map__zone-title'
					style={{
						fontSize: fontSize + 'rem',
						top: topOffset + 'rem',
						left: leftOffset + 'rem',
					}}
				>
					{zoneLetter}
				</p>
			);
		},
	),
);

export default LetterZone;
