import { FC, useState, useEffect, useRef } from 'react';
import Section from './Section';
import { IZone, IZoneLetter } from '../../../types/map';
import LetterZone from './info/LetterZone';
import { observer } from 'mobx-react-lite';

const initialZoneLetter: IZoneLetter = {
	fontSize: 30,
	topOffset: 100,
	leftOffset: 100,
};

const Map: FC<IZone> = observer(({ id, zoneLetter, sections }) => {
	const [zoneLetterObject, setZoneLetterObject] = useState<IZoneLetter>(initialZoneLetter);

	const letterZoneNode = useRef<HTMLParagraphElement>(null);

	const zoneNode = useRef<HTMLDivElement>(null);

	function findPositionSectionNumber() {
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
	}

	useEffect(() => {
		findPositionSectionNumber();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [zoneNode.current?.offsetHeight, zoneNode.current?.offsetWidth]);

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
});

export default Map;
