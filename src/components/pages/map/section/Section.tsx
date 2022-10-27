import { observer } from 'mobx-react-lite';
import { FC, useEffect, useRef, useState } from 'react';
import Block from '../block/Block';
import HeaderBlock from '../block/HeaderBlock';
import NumberSection from '../info/numberSection/NumberSection';
import { ISectionProps } from './types';

const Section: FC<ISectionProps> = observer(({ id, blocks, index }) => {
	const [sectionNumberFontSize, setSectionNumberFontSize] = useState<number>(10);

	const letterSectionNode = useRef<HTMLParagraphElement>(null);

	const sectionNode = useRef<HTMLDivElement>(null);

	useEffect(() => {
		let newSectionNumberFontSize: number;

		let tableHeigth: number | undefined = sectionNode.current?.offsetHeight;
		
		if (tableHeigth) {
			newSectionNumberFontSize = tableHeigth / 40;
			setSectionNumberFontSize(newSectionNumberFontSize);
		}
	}, [sectionNode.current?.offsetHeight]);

	return (
		<div className='map__section' ref={sectionNode}>
			<HeaderBlock floors={blocks[0].floors} />

			{blocks.map((block, index) => {
				return (
					<Block key={block.id} id={block.id} index={index + 1} floors={block.floors} />
				);
			})}
			<NumberSection ref={letterSectionNode} fontSize={sectionNumberFontSize} index={index} />
		</div>
	);
});

export default Section;
