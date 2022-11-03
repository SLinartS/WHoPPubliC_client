import './style.scss';

import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';

import { useRootStore } from '../../../utils/RootStoreProvider/useRootStore';
import Zone from './zone/Zone';

interface IMapProps {
  additionalClasses?: string;
}

const Map: FC<IMapProps> = observer(({ additionalClasses }) => {
  const { storeMap } = useRootStore();

  useEffect(() => {
    if (storeMap.statusFetchMap === 'pending') {
      storeMap.fetchMap();
    }
  }, [storeMap, storeMap.statusFetchMap]);

  return (
    <div className={`map-block ${additionalClasses}}`}>
      {storeMap.mapData.map((zone, zoneIndex) => (
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