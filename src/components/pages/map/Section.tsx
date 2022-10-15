import React, { FC, useEffect, useState } from 'react';
import { ISectionNumber, ISection, IZoneLetter } from '../../../types/map';
import NumberSection from './info/NumberSection';
import Row from './rows/Floor';

const initialSectionNumber: ISectionNumber = {
	fontSize: 10,
	topOffset: 100,
	rightOffset: 100,
};

const Table: FC<ISection> = ({ id, columnsNumber, rows }) => {
	const [sectionNumber, setSectionNumber] = useState<ISectionNumber>(initialSectionNumber);

	const letterSectionNode = React.useRef<HTMLParagraphElement>(null);

	const sectionNode = React.useRef<HTMLDivElement>(null);

	useEffect(() => {
		let newSectionNumber: ISectionNumber = {
			fontSize: sectionNumber.topOffset,
			topOffset: sectionNumber.topOffset,
			rightOffset: sectionNumber.rightOffset,
		};

		let tableHeigth = sectionNode.current?.offsetHeight;
		let tableWidth = sectionNode.current?.offsetWidth;

		if (tableHeigth && tableWidth) {

			newSectionNumber.fontSize = tableHeigth / 40

			let letterSectionHeigth = letterSectionNode.current?.offsetHeight;
			let letterSectionWidth = letterSectionNode.current?.offsetWidth;

			let valueExists = letterSectionHeigth && letterSectionWidth;

			if (valueExists) {
				newSectionNumber.topOffset = tableHeigth / 20 - letterSectionHeigth! / 20 + 2;
				newSectionNumber.rightOffset = letterSectionWidth! / 8;

				setSectionNumber({ ...newSectionNumber });
			}
		}
	}, [sectionNode.current?.offsetHeight]);

	return (
		<div className='map__section' ref={sectionNode}>
			{rows.map((row) => {
				return (
					<Row
						key={row.number}
						id={row.id}
						number={row.number}
						isHeadRow={row.isHeadRow}
						columnsNumber={columnsNumber}
					/>
				);
			})}
			<NumberSection
				key={sectionNumber.topOffset}
				ref={letterSectionNode}
				fontSize={sectionNumber.fontSize}
				topOffset={sectionNumber.topOffset}
				rightOffset={sectionNumber.rightOffset}
			/>
		</div>
	);
};

export default Table;
