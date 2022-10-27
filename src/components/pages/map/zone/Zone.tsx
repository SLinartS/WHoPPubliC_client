import { FC, useState, useEffect, useRef } from 'react';

import { observer } from 'mobx-react-lite';
import { IZone } from '../types';
import Section from '../section/Section';
import LetterZone from '../info/LetterZone';

const Zone: FC<IZone> = observer(({ id, zoneLetter, sections }) => {
	const [zoneLetterFontSize, setZoneLetterFontSize] = useState<number>(30);

	const letterZoneNode = useRef<HTMLParagraphElement>(null);

	const zoneNode = useRef<HTMLDivElement>(null);

	function findFontSizeZoneLetter() {
		let newZoneLetterFontSize: number = zoneLetterFontSize;

		let tableHeigth: number | undefined = zoneNode.current?.offsetHeight;
		let tableWidth: number | undefined = zoneNode.current?.offsetWidth;

		if (tableHeigth && tableWidth) {
			if (tableHeigth > tableWidth) {
				newZoneLetterFontSize = tableWidth / 11;
			} else {
				newZoneLetterFontSize = tableHeigth / 11;
			}
			setZoneLetterFontSize(newZoneLetterFontSize);
		}
	}

	useEffect(() => {
		findFontSizeZoneLetter();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [zoneNode.current?.offsetHeight, zoneNode.current?.offsetWidth]);

	return (
		<div className='map__zone' ref={zoneNode}>
			{sections.map((section) => {
				return <Section key={section.id} id={section.id} blocks={section.blocks} />;
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
