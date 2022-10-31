import { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import './style.scss';

import { useRootStore } from '../../../utils/RootStoreProvider/useRootStore';
import Zone from './zone/Zone';
import { IMapProps } from './type';

const Map: FC<IMapProps> = observer(({ additionalClasses }) => {
  const { mapStore } = useRootStore();

  useEffect(() => {
    if (mapStore.status === 'pending') {
      mapStore.getMap();
    }
  }, [mapStore, mapStore.status]);

  return (
    <div className={`map-block ${additionalClasses}}`}>
      {mapStore.mapData.map((zone, zoneIndex) => (
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
