import { observer } from 'mobx-react-lite';
import { FC, useEffect, useRef, useState } from 'react';
import { ISection } from '../../../../store/map/type';
import Block from '../block/Block';
import HeaderBlock from '../block/HeaderBlock';
import NumberSection from '../info/numberSection/NumberSection';

const Section: FC<ISection> = observer(({ id, number, blocks }) => {
  const [sectionNumberFontSize, setSectionNumberFontSize] =
    useState<number>(10);

  const letterSectionNode = useRef<HTMLParagraphElement>(null);

  const sectionNode = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let newSectionNumberFontSize: number;

    const tableHeigth: number | undefined = sectionNode.current?.offsetHeight;

    if (tableHeigth) {
      newSectionNumberFontSize = tableHeigth / 40;
      setSectionNumberFontSize(newSectionNumberFontSize);
    }
  }, [sectionNode.current?.offsetHeight]);

  return (
    <div
      className='map__section'
      ref={sectionNode}
      data-section-id={id}
    >
      <HeaderBlock floors={blocks[0].floors} />

      {blocks.map((block) => (
        <Block
          key={block.id}
          id={block.id}
          number={block.number}
          floors={block.floors}
        />
      ))}
      <NumberSection
        ref={letterSectionNode}
        fontSize={sectionNumberFontSize}
        number={number}
      />
    </div>
  );
});

export default Section;
