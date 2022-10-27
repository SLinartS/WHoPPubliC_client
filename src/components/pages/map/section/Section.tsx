import { observer } from 'mobx-react-lite';
import { FC, useEffect, useRef, useState } from 'react';
import NumberSection from '../info/NumberSection';
import Block from '../rows/Block';
import HeaderBlock from '../rows/HeaderBlock';
import { ISection } from '../types';

const Section: FC<ISection> = observer(({ id, blocks }) => {
	const [sectionNumberFontSize, setSectionNumberFontSize] = useState<number>(10);

	const letterSectionNode = useRef<HTMLParagraphElement>(null);

	const sectionNode = useRef<HTMLDivElement>(null);

	function findFontSizeSectionNumber() {
		let newSectionNumberFontSize: number = sectionNumberFontSize;

		let tableHeigth: number | undefined = sectionNode.current?.offsetHeight;

		if (tableHeigth) {
			newSectionNumberFontSize = tableHeigth / 40;

			setSectionNumberFontSize(newSectionNumberFontSize);
		}
	}

	useEffect(() => {
		findFontSizeSectionNumber();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sectionNode.current?.offsetHeight, sectionNode.current?.offsetWidth]);

	return (
		<div className='map__section' ref={sectionNode}>
			<HeaderBlock floors={blocks[0].floors} />

			{blocks.map((block, index) => {
				return (
					<Block key={block.id} id={block.id} index={index + 1} floors={block.floors} />
				);
			})}
			<NumberSection ref={letterSectionNode} fontSize={sectionNumberFontSize} />
		</div>
	);
});

export default Section;
