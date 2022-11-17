import './style.scss';

import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { useRootStore } from '../../../utils/RootStoreProvider/useRootStore';
import Zone from './zone/Zone';

interface IMapProps {
  classes?: string;
}

const Map: FC<IMapProps> = observer(({ classes }) => {
  const { storeMap } = useRootStore();

  return (
    <div className={`map-block ${classes}`}>
      {storeMap.state.map.map((zone, zoneIndex) => (
        <Zone
          key={zone.id}
          id={zone.id}
          number={zone.number}
          zoneLetter={zone.zoneLetter}
          sections={zone.sections}
          index={zoneIndex}
        />
      ))}
    </div>
  );
});

export default Map;
