import { FC, useState, useEffect, useRef } from 'react';

import { observer } from 'mobx-react-lite';
import Section from '../section/Section';
import LetterZone from '../info/letterZone/LetterZone';
import { IZone } from '../../../../store/map/type';

const Zone: FC<IZone> = observer(({ id, number, zoneLetter, sections }) => {
	const [zoneLetterFontSize, setZoneLetterFontSize] = useState<number>(30);

	const letterZoneNode = useRef<HTMLParagraphElement>(null);

	const zoneNode = useRef<HTMLDivElement>(null);

	useEffect(() => {
		let newZoneLetterFontSize: number;

		let tableHeigth: number | undefined = zoneNode.current?.offsetHeight;
		let tableWidth: number | undefined = zoneNode.current?.offsetWidth;

		if (tableHeigth && tableWidth) {
			if (tableHeigth > tableWidth) {
				newZoneLetterFontSize = tableWidth / 13;
			} else {
				newZoneLetterFontSize = tableHeigth / 13;
			}
			setZoneLetterFontSize(newZoneLetterFontSize);
		}
	}, [zoneNode.current?.offsetHeight, zoneNode.current?.offsetWidth]);

	return (
		<div className='map__zone' ref={zoneNode} data-zone-id={id}>
			{sections.map((section) => {
				return (
					<Section
						key={section.id}
						id={section.id}
						number={section.number}
						blocks={section.blocks}
					/>
				);
			})}
			<LetterZone
				ref={letterZoneNode}
				fontSize={zoneLetterFontSize}
				zoneLetter={zoneLetter}
			/>
		</div>
	);
});

export default Zone;
