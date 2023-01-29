import addIcon from '@assets/icons/add-white.svg';
import minusIcon from '@assets/icons/minus.svg';
import ButtonIcon from '@components/buttonIcon/ButtonIcon';
import { IBlock } from '@store/map/type';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import MapFloor from '../floor/Floor';
import MapHeaderFloor from '../floor/HeaderFloor';
import { useAddFloor } from '../hooks/add/useAddFloor';
import { useRemoveFloor } from '../hooks/remove/useRemoveFloor';

interface IMapBlockProps extends IBlock {
  index: number;
  sectionId: number;
  isEdit?: boolean;
}

const MapBlock: FC<IMapBlockProps> = ({
  id,
  number,
  floors,
  index,
  sectionId,
  isEdit = false,
}) => {
  const addFloorHook = useAddFloor();
  const removeFloorHook = useRemoveFloor();

  function addHandler() {
    addFloorHook(sectionId);
  }

  function removeHandler() {
    removeFloorHook(sectionId);
  }

  return (
    <div
      className='map-block__block'
      style={{ gridTemplateRows: `repeat(${floors.length + 1}, 5rem` }}
      data-block-id={id}
      data-block-index={index}
    >
      <MapHeaderFloor index={number} />

      {floors.map((floor, floorIndex) => (
        <MapFloor
          key={floor.id}
          id={floor.id}
          number={floor.number}
          capacity={floor.capacity}
          freeSpace={floor.freeSpace}
          reservedSpace={floor.reservedSpace}
          index={floorIndex}
        />
      ))}
      {isEdit && index === 0 && (
        <div className='map-block__buttons map-block__buttons--floor'>
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
    </div>
  );
};

export default observer(MapBlock);