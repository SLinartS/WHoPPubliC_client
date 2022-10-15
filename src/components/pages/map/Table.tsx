import React, { FC, useEffect, useState } from 'react';
import { IMapSectionLetter, IMapTable, IMapZoneLetter } from '../../../types/map';
import Row from './rows/Row';

const initialMapZoneLetter: IMapZoneLetter = {
	fontSize: 30,
	topOffset: 100,
	leftOffset: 100,
};

const initialMapSectionLetter: IMapSectionLetter = {
	topOffset: 100,
	rightOffset: 100,
};

const Table: FC<IMapTable> = ({ columnsNumber, zoneLetter, rows }) => {
	const [mapZoneLetter, setMapZoneLetter] = useState<IMapZoneLetter>(initialMapZoneLetter);

	const [mapSectionLetter, setMapSectionLetter] = useState<IMapSectionLetter>(initialMapSectionLetter);

	const tableNode = React.useRef<HTMLTableElement>(null);
	const letterZoneNode = React.useRef<HTMLTableElement>(null);
	const letterSectionNode = React.useRef<HTMLTableElement>(null);

	useEffect(() => {
		let newZoneLetter = {
			fontSize: mapZoneLetter.fontSize,
			topOffset: mapZoneLetter.topOffset,
			leftOffset: mapZoneLetter.leftOffset,
		};

		let newSectionLetter = {
			topOffset: mapSectionLetter.topOffset,
			rightOffset: mapSectionLetter.rightOffset,
		};

		let tableHeigth = tableNode.current?.offsetHeight;
		let tableWidth = tableNode.current?.offsetWidth;

		if (tableHeigth && tableWidth) {
			if (tableHeigth > tableWidth) {
				newZoneLetter.fontSize = tableWidth / 10;
			} else {
				newZoneLetter.fontSize = tableHeigth / 10;
			}
			setMapZoneLetter({ ...newZoneLetter });

			let letterZoneHeigth = letterZoneNode.current?.offsetHeight;
			let letterZoneWidth = letterZoneNode.current?.offsetWidth;

			let letterSectionHeigth = letterSectionNode.current?.offsetHeight;
			let letterSectionWidth = letterSectionNode.current?.offsetWidth;

			let valueExists =
				letterZoneHeigth && letterZoneWidth && letterSectionHeigth && letterSectionWidth;

			if (valueExists) {
				newZoneLetter.topOffset = tableHeigth / 20 - letterZoneHeigth! / 20 + 2;
				newZoneLetter.leftOffset = tableWidth / 20 - letterZoneWidth! / 20 + 2.5;

				newSectionLetter.topOffset = tableHeigth / 20 - letterSectionHeigth! / 20 + 2;
				newSectionLetter.rightOffset = letterSectionWidth! / 8;

				setMapZoneLetter({ ...newZoneLetter });
        setMapSectionLetter({...newSectionLetter})
			}
		}
	}, [
		tableNode.current?.offsetHeight,
		mapZoneLetter.fontSize,
		mapZoneLetter.leftOffset,
		mapZoneLetter.topOffset,
	]);

	return (
		<div className='map__table' ref={tableNode}>
			{rows.map((row) => {
				return (
					<Row
						key={row.number}
						number={row.number}
						isHeadRow={row.isHeadRow}
						columnsNumber={columnsNumber}
					/>
				);
			})}

			<p
				ref={letterZoneNode}
				className='map__zone-title'
				style={{
					fontSize: mapZoneLetter.fontSize + 'rem',
					top: mapZoneLetter.topOffset + 'rem',
					left: mapZoneLetter.leftOffset + 'rem',
				}}
			>
				{zoneLetter}
			</p>
			<p
				ref={letterSectionNode}
				className='map__section-title'
				style={{
					top: mapSectionLetter.topOffset + 'rem',
					right: -mapSectionLetter.rightOffset + 'rem',
				}}
			>
				{1}
			</p>
		</div>
	);
};

export default Table;
