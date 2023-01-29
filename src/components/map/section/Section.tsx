import addIcon from '@assets/icons/add-white.svg';
import minusIcon from '@assets/icons/minus.svg';
import ButtonIcon from '@components/buttonIcon/ButtonIcon';
import { ISection } from '@store/map/type';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import MapBlock from '../block/Block';
import MapHeaderBlock from '../block/HeaderBlock';
import { useAddBlock } from '../hooks/add/useAddBlock';
import { useRemoveBlock } from '../hooks/remove/useRemoveBlock';
import MapInfoSectionNumber from '../info/sectionNumber/sectionNumber';

interface IMapSectionProps extends ISection {
  index: number;
  isEdit?: boolean;
}

const MapSection: FC<IMapSectionProps> = ({
  id,
  number,
  blocks,
  index,
  isEdit = false,
}) => {
  const addBlockHook = useAddBlock();
  const removeBlockHook = useRemoveBlock();

  function addHandler() {
    addBlockHook(id);
  }

  function removeHandler() {
    removeBlockHook(id);
  }

  return (
    <div
      className='map-block__section'
      data-section-id={id}
      data-section-index={index}
    >
      {blocks[0] && <MapHeaderBlock floors={blocks[0]?.floors} />}

      {blocks.map((block, blockIndex) => (
        <MapBlock
          key={block.id}
          id={block.id}
          number={block.number}
          floors={block.floors}
          index={blockIndex}
          sectionId={id}
          isEdit={isEdit}
        />
      ))}
      {isEdit && (
        <div className='map-block__buttons map-block__buttons--block'>
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
      <MapInfoSectionNumber
        fontSize={8}
        number={number}
      />
    </div>
  );
};

export default observer(MapSection);
