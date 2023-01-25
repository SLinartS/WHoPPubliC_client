import { observer } from 'mobx-react-lite';
import { FC } from 'react';

interface IMapZoneLetterProps {
  fontSize: number;
  zoneLetter: string;
}

const MapInfoZoneLetter: FC<IMapZoneLetterProps> = ({
  fontSize,
  zoneLetter,
}) => {
  return (
    <p
      className='map-block__zone-title'
      style={{
        fontSize: `${fontSize}rem`,
      }}
    >
      {zoneLetter}
    </p>
  );
};

export default observer(MapInfoZoneLetter);
