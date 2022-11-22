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
    const { storeMap, storePopup } = useRootStore();
    const [styles, setStyles] = useState<IMapFloorStyles>();
    const floorNode = useRef<HTMLDivElement>(null);
    const getFloorCoordinates = useGetFloorCoordinates();
    const checkIsAdded = useCheckIsAdded();

    function chooseFloor() {
      if (floorNode.current && storePopup.form.state.isSelectedMap) {
        const { zone, section, block, floor } = getFloorCoordinates(
          floorNode.current,
        );

        if (zone && section && block && floor) {
          let floorActive: boolean = false;
          const floorIsAlreadyAdded = checkIsAdded(
            storePopup.select.warehousePoints.arrayValue,
            floor.id,
          );

          if (floorIsAlreadyAdded) {
            storePopup.select.warehousePoints.removeItem(floor.id);
          } else {
            floorActive = true;
            storePopup.select.warehousePoints.addItem(floor.id);
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
        if (storePopup.form.state.isSelectedMap) {
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
    }, [
      active,
      number,
      freeSpace,
      capacity,
      storePopup.form.state.isSelectedMap,
    ]);

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
