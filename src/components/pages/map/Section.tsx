import React, { FC, useEffect, useState } from 'react';
import { ISectionNumber, ISection } from '../../../types/map';
import NumberSection from './info/NumberSection';
import Block from './rows/Block';
import HeaderBlock from './rows/HeaderBlock';

const initialSectionNumber: ISectionNumber = {
	fontSize: 10,
	topOffset: 100,
	rightOffset: 100,
};

const Table: FC<ISection> = ({ id, floorsNumber, blocks }) => {
	const [sectionNumber, setSectionNumber] = useState<ISectionNumber>(initialSectionNumber);

	const letterSectionNode = React.useRef<HTMLParagraphElement>(null);

	const sectionNode = React.useRef<HTMLDivElement>(null);

	useEffect(() => {
		let newSectionNumber: ISectionNumber = {
			fontSize: sectionNumber.topOffset,
			topOffset: sectionNumber.topOffset,
			rightOffset: sectionNumber.rightOffset,
		};

		let tableHeigth: number | undefined = sectionNode.current?.offsetHeight;
		let tableWidth: number | undefined = sectionNode.current?.offsetWidth;

		if (tableHeigth && tableWidth) {
			newSectionNumber.fontSize = tableHeigth / 40;

			let letterSectionHeigth: number | undefined = letterSectionNode.current?.offsetHeight;
			let letterSectionWidth: number | undefined = letterSectionNode.current?.offsetWidth;

			let valueExists = letterSectionHeigth && letterSectionWidth;

			if (valueExists) {
				newSectionNumber.topOffset = tableHeigth / 20 - letterSectionHeigth! / 20 - 2.5;
				newSectionNumber.rightOffset = letterSectionWidth! / 8;

				setSectionNumber({ ...newSectionNumber });
			}
		}
	}, [sectionNode.current?.offsetHeight, sectionNumber.rightOffset, sectionNumber.topOffset]);

	return (
		<div className='map__section' ref={sectionNode}>
			<HeaderBlock floorsNumber={floorsNumber} />
			{blocks.map((block) => {
				return <Block key={block.id} id={block.id} floorsNumber={floorsNumber} />;
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
