import { observer } from 'mobx-react-lite';
import { FC } from 'react';

interface IMapSectionNumberProps {
  number: number;
}

const MapInfoSectionNumber: FC<IMapSectionNumberProps> = ({ number }) => {
  return <p className='map-block__section-title'>{number}</p>;
};

export default observer(MapInfoSectionNumber);
