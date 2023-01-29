import './style.scss';

import addIcon from '@assets/icons/add-white.svg';
import resetIcon from '@assets/icons/reset-orange.svg';
import ButtonIcon from '@components/buttonIcon/ButtonIcon';
import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { useAddZone } from './hooks/add/useAddZone';
import Zone from './zone/Zone';

interface IMapProps {
  classes?: string;
  isEditZoneButton?: boolean;
}

const Map: FC<IMapProps> = ({ classes, isEditZoneButton = false }) => {
  const { storeMap, storePopup } = useRootStore();
  const addZoneHook = useAddZone();

  function resetMapHandler() {
    storeMap.status.set('fetch', 'pending');
  }

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
          isEditZoneButton={isEditZoneButton}
        />
      ))}
      {isEditZoneButton && (
        <div className='map-block__buttons map-block__buttons--map'>
          <ButtonIcon
            src={addIcon}
            clickHandler={addZoneHook}
            classes='map-block__button'
          />
        </div>
      )}
      {!storePopup.form.state.isSelectedMap && (
        <ButtonIcon
          src={resetIcon}
          clickHandler={resetMapHandler}
          classes='map-block__button-reset'
        />
      )}
    </div>
  );
};

export default observer(Map);
