import './style.scss';

import addIcon from '@assets/icons/add/add-white.svg';
import resetIcon from '@assets/icons/reset/reset-second.svg';
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
  const addZone = useAddZone();

  function resetMapHandler() {
    storeMap.status.set('fetch', 'pending');
  }

  function isDisplayResetButton(): boolean {
    return (
      !storePopup.form.state.isSelectedMap && !storePopup.form.state.isViewMap
    );
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
            clickHandler={addZone}
            classes='map-block__button'
          />
        </div>
      )}
      {isDisplayResetButton() && (
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
