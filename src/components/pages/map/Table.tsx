import React, { FC, useEffect, useState } from 'react';
import { IMapTableData, IMapZoneLetter } from '../../../types/map';
import Row from './rows/Row';

const initialMapZoneLetter: IMapZoneLetter = {
	fontSize: 30,
	topOffset: 100,
	leftOffset: 100,
};

const Table: FC<IMapTableData> = ({ rows, zoneLetter }) => {
	const [mapZoneLetter, setMapZoneLetter] = useState<IMapZoneLetter>(initialMapZoneLetter);

	const tableNode = React.useRef<HTMLTableElement>(null);
	const letterNode = React.useRef<HTMLTableElement>(null);

	useEffect(() => {
		let newZoneLetter = {
			fontSize: mapZoneLetter.fontSize,
			topOffset: mapZoneLetter.topOffset,
			leftOffset: mapZoneLetter.leftOffset,
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

			let letterHeigth = letterNode.current?.offsetHeight;
			let letterWidth = letterNode.current?.offsetWidth;

			if (letterHeigth && letterWidth) {
				newZoneLetter.topOffset = tableHeigth! / 20 - letterHeigth / 20 + 2;
				newZoneLetter.leftOffset = tableWidth! / 20 - letterWidth / 20 + 2.5;
				setMapZoneLetter({ ...newZoneLetter });
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
						isHeadRow={row.isHeadRow}
						columnsNumber={row.columnsNumber}
						number={row.number}
					/>
				);
			})}

			<p
				ref={letterNode}
				className='map__zone-title'
				style={{
					fontSize: mapZoneLetter.fontSize + 'rem',
					top: mapZoneLetter.topOffset + 'rem',
					left: mapZoneLetter.leftOffset + 'rem',
				}}
			>
				{zoneLetter}
			</p>
		</div>
	);
};

export default Table;
