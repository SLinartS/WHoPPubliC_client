import { observer } from 'mobx-react-lite';
import { FC, useEffect, useRef, useState } from 'react';

import { ISection } from '../../../../store/map/type';
import MapBlock from '../block/Block';
import MapHeaderBlock from '../block/HeaderBlock';
import MapInfoSectionNumber from '../info/sectionNumber/sectionNumber';

interface IMapSectionProps extends ISection {
  index: number;
}

const MapSection: FC<IMapSectionProps> = observer(
  ({ id, number, blocks, index }) => {
    const [sectionNumberFontSize, setSectionNumberFontSize] =
      useState<number>(10);

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
        className='map-block__section'
        ref={sectionNode}
        data-section-id={id}
        data-section-index={index}
      >
        <MapHeaderBlock floors={blocks[0].floors} />

        {blocks.map((block, blockIndex) => (
          <MapBlock
            key={block.id}
            id={block.id}
            number={block.number}
            floors={block.floors}
            index={blockIndex}
          />
        ))}
        <MapInfoSectionNumber
          fontSize={sectionNumberFontSize}
          number={number}
        />
      </div>
    );
  },
);

export default MapSection;
