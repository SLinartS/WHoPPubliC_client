import { observer } from 'mobx-react-lite';
import { FC, useEffect, useRef, useState } from 'react';

import useCheckIsAdded from '../../../../hooks/mapAndPoint/useCheckIsAdded';
import useGetFloorCoordinates from '../../../../hooks/mapAndPoint/useGetFloorCoordinates';
import { IFloor } from '../../../../store/map/type';
import { useRootStore } from '../../../../utils/RootStoreProvider/useRootStore';

interface IMapFloorProps extends IFloor {
  index: number;
}

interface IMapFloorStyles {
  [key: string]: string;
}

const MapFloor: FC<IMapFloorProps> = observer(
  ({ id, active, number, capacity, freeSpace, index }) => {
    const { storeForm, storeMap } = useRootStore();
    const [styles, setStyles] = useState<IMapFloorStyles>();
    const floorNode = useRef<HTMLDivElement>(null);
    const getFloorCoordinates = useGetFloorCoordinates();
    const checkIsAdded = useCheckIsAdded();

    function chooseFloor() {
      if (floorNode.current && storeForm.state.isSelectedMap) {
        const { zone, section, block, floor } = getFloorCoordinates(
          floorNode.current,
        );

        if (zone && section && block && floor) {
          let floorActive: boolean = false;
          const floorIsAlreadyAdded = checkIsAdded(
            storeForm.task.array.getFormArrays('warehousePoints'),
            floor.id,
          );

          if (floorIsAlreadyAdded) {
            storeForm.task.array.removeFormArrays('warehousePoints', floor.id);
          } else {
            floorActive = true;
            storeForm.task.array.addFormArrays('warehousePoints', floor.id);
          }
          storeMap.utils.setFloorActive(
            zone.index,
            section.index,
            block.index,
            floor.index,
            floorActive,
          );
        }
      }
    }

    useEffect(() => {
      const newStyle = {
        gridRow: `${-number}/${-number - 1}`,
        background: 'unset',
      };
      if (active) {
        if (storeForm.state.isSelectedMap) {
          newStyle.background = `linear-gradient(180deg, 
              #d35f48 ${(freeSpace / capacity) * 100}%, 
              #7fa89c ${(freeSpace / capacity) * 100}%)`;
        }
      } else {
        newStyle.background = `linear-gradient(180deg, 
          transparent ${(freeSpace / capacity) * 100}%, 
          #7fa89c ${(freeSpace / capacity) * 100}%)`;
      }

      setStyles(newStyle);
    }, [active, number, freeSpace, capacity, storeForm.state.isSelectedMap]);

    return (
      <div
        ref={floorNode}
        className='map-block__floor'
        data-floor-id={id}
        data-floor-index={index}
        data-floor-free-space={freeSpace}
        style={styles}
        onClick={chooseFloor}
      />
    );
  },
);

export default MapFloor;
