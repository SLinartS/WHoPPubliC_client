import addIcon from '@assets/icons/add-white.svg';
import changeIcon from '@assets/icons/edit-white.svg';
import minusIcon from '@assets/icons/minus.svg';
import ButtonIcon from '@components/buttonIcon/ButtonIcon';
import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { IZone } from '@store/map/type';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { useAddSection } from '../hooks/add/useAddSection';
import { useRemoveSection } from '../hooks/remove/useRemoveSection';
import { useRemoveZone } from '../hooks/remove/useRemoveZone';
import MapInfoZoneLetter from '../info/zoneLetter/ZoneLetter';
import MapSection from '../section/Section';

interface IMapZoneProps extends IZone {
  index: number;
  isEditZoneButton?: boolean;
  isEdit?: boolean;
}

const MapZone: FC<IMapZoneProps> = ({
  id,
  zoneLetter,
  sections,
  index,
  isEditZoneButton = false,
  isEdit = false,
}) => {
  const { storePopup } = useRootStore();
  const addSectionHook = useAddSection();
  const removeSectionHook = useRemoveSection();
  const removeZoneHook = useRemoveZone();

  function addHandler() {
    addSectionHook();
  }

  function removeHandler() {
    removeSectionHook();
  }

  function removeZoneHandler() {
    removeZoneHook(id);
  }

  function openZoneChangeHandler() {
    storePopup.status.show('formMap', () => {
      storePopup.form.map.setCurrentZoneId(id);
    });
  }

  return (
    <div
      className='map-block__zone'
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
          isEdit={isEdit}
        />
      ))}
      {isEdit && (
        <div className='map-block__buttons map-block__buttons--section'>
          <ButtonIcon
            src={addIcon}
            clickHandler={addHandler}
            classes='map-block__button'
          />
          <ButtonIcon
            src={minusIcon}
            clickHandler={removeHandler}
            classes='map-block__button'
          />
        </div>
      )}
      <MapInfoZoneLetter
        fontSize={15}
        zoneLetter={zoneLetter}
      />
      {isEditZoneButton && (
        <div className='map-block__buttons map-block__buttons--zone'>
          <ButtonIcon
            src={changeIcon}
            clickHandler={openZoneChangeHandler}
            classes='map-block__button'
          />
          <ButtonIcon
            src={minusIcon}
            clickHandler={removeZoneHandler}
            classes='map-block__button'
          />
        </div>
      )}
    </div>
  );
};

export default observer(MapZone);
