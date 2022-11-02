import { observer } from 'mobx-react-lite';
import { FC } from 'react';

interface IMapSectionNumberProps {
  fontSize: number;
  number: number;
}

const MapInfoSectionNumber: FC<IMapSectionNumberProps> = observer(
  ({ fontSize, number }) => {
    return (
      <p
        className='map-block__section-title'
        style={{
          fontSize: `${fontSize}rem`,
        }}
      >
        {number}
      </p>
    );
  },
);

export default MapInfoSectionNumber;
