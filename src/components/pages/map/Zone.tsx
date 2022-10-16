import React, { FC, useState, useEffect } from 'react';
import Section from './Section';
import { IZone, IZoneLetter } from '../../../types/map';
import LetterZone from './info/LetterZone';

const initialZoneLetter: IZoneLetter = {
	fontSize: 30,
	topOffset: 100,
	leftOffset: 100,
};

const Map: FC<IZone> = ({ id, zoneLetter, sections }) => {
	const [zoneLetterObject, setZoneLetterObject] = useState<IZoneLetter>(initialZoneLetter);

	const letterZoneNode = React.useRef<HTMLParagraphElement>(null);

	const zoneNode = React.useRef<HTMLDivElement>(null);

	useEffect(() => {
		let newZoneLetterObject: IZoneLetter = {
			fontSize: zoneLetterObject.fontSize,
			topOffset: zoneLetterObject.topOffset,
			leftOffset: zoneLetterObject.leftOffset,
		};

		let tableHeigth: number | undefined = zoneNode.current?.offsetHeight;
		let tableWidth: number | undefined = zoneNode.current?.offsetWidth;

		if (tableHeigth && tableWidth) {
			if (tableHeigth > tableWidth) {
				newZoneLetterObject.fontSize = tableWidth / 11;
			} else {
				newZoneLetterObject.fontSize = tableHeigth / 11;
			}
			setZoneLetterObject({ ...newZoneLetterObject });

			let letterZoneHeigth: number | undefined = letterZoneNode.current?.offsetHeight;
			let letterZoneWidth: number | undefined = letterZoneNode.current?.offsetWidth;

			let valueExists = letterZoneHeigth && letterZoneWidth;

			if (valueExists) {
				newZoneLetterObject.topOffset = tableHeigth / 20 - letterZoneHeigth! / 20 - 2.5;
				newZoneLetterObject.leftOffset = tableWidth / 20 - letterZoneWidth! / 20 + 2.5;

				setZoneLetterObject({ ...newZoneLetterObject });
			}
		}
	}, [
		zoneNode.current?.offsetHeight,
		zoneLetterObject.fontSize,
		zoneLetterObject.leftOffset,
		zoneLetterObject.topOffset,
	]);

	return (
		<div className='map__zone' ref={zoneNode}>
			{sections.map((section) => {
				return (
					<Section
						key={section.id}
						id={section.id}
						floorsNumber={section.floorsNumber}
						blocks={section.blocks}
					/>
				);
			})}
			<LetterZone
				key={zoneLetterObject.topOffset}
				ref={letterZoneNode}
				fontSize={zoneLetterObject.fontSize}
				topOffset={zoneLetterObject.topOffset}
				leftOffset={zoneLetterObject.leftOffset}
				zoneLetter={zoneLetter}
			/>
		</div>
	);
};

export default Map;
