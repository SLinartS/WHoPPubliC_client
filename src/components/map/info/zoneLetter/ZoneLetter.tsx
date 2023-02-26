import { observer } from 'mobx-react-lite';
import { FC } from 'react';

interface IMapZoneLetterProps {
  zoneLetter: string;
}

const MapInfoZoneLetter: FC<IMapZoneLetterProps> = ({ zoneLetter }) => {
  return <p className='map-block__zone-title'>{zoneLetter}</p>;
};

export default observer(MapInfoZoneLetter);
