import React, { forwardRef } from 'react';
import { IZoneLetterComponent } from '../../../../types/map';

const LetterZone = forwardRef<HTMLParagraphElement, IZoneLetterComponent>(
	({ fontSize, topOffset, leftOffset, zoneLetter}, ref) => {
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
);

export default LetterZone;
