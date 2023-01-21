import { observer } from 'mobx-react-lite';
import { FC, useEffect, useRef, useState } from 'react';

import { IZone } from '../../../../store/map/type';
import MapInfoZoneLetter from '../info/zoneLetter/ZoneLetter';
import MapSection from '../section/Section';

interface IMapZoneProps extends IZone {
  index: number;
}

const MapZone: FC<IMapZoneProps> = observer(
  ({ id, zoneLetter, sections, index }) => {
    const [zoneLetterFontSize, setZoneLetterFontSize] = useState<number>(1);

    const zoneNode = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (zoneLetterFontSize === 1) {
        let newZoneLetterFontSize: number;

        const tableHeigth: number | undefined = zoneNode.current?.offsetHeight;
        const tableWidth: number | undefined = zoneNode.current?.offsetWidth;

        if (tableHeigth && tableWidth) {
          if (tableHeigth > tableWidth) {
            newZoneLetterFontSize = tableWidth / 20;
          } else {
            newZoneLetterFontSize = tableHeigth / 20;
          }
          setZoneLetterFontSize(newZoneLetterFontSize);
        }
      }
    }, []);

    return (
      <div
        className='map-block__zone'
        ref={zoneNode}
        data-zone-id={id}
        data-zone-index={index}
      >
        {sections.map((section, sectionIndex) => (
          <MapSection
            key={section.id}
            id={section.id}
            number={section.number}
            blocks={section.blocks}
            index={sectionIndex}
          />
        ))}
        <MapInfoZoneLetter
          fontSize={zoneLetterFontSize}
          zoneLetter={zoneLetter}
        />
      </div>
    );
  },
);

export default MapZone;
