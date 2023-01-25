import { ISection } from '@store/map/type';
import { observer } from 'mobx-react-lite';
import { FC, useEffect, useRef, useState } from 'react';

import MapBlock from '../block/Block';
import MapHeaderBlock from '../block/HeaderBlock';
import MapInfoSectionNumber from '../info/sectionNumber/sectionNumber';

interface IMapSectionProps extends ISection {
  index: number;
}

const MapSection: FC<IMapSectionProps> = ({ id, number, blocks, index }) => {
  const [sectionNumberFontSize, setSectionNumberFontSize] = useState<number>(1);

  const sectionNode = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionNumberFontSize === 1) {
      const tableHeigth: number | undefined = sectionNode.current?.offsetHeight;

      if (tableHeigth) {
        setSectionNumberFontSize(tableHeigth / 40);
      }
    }
  }, []);

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
};

export default observer(MapSection);
