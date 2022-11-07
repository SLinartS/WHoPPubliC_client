import { observer } from 'mobx-react-lite';
import { FC, useRef } from 'react';

import useCheckIsAdded from '../../../../hooks/mapAndPoint/useCheckIsAdded';
import useGetFloorCoordinates from '../../../../hooks/mapAndPoint/useGetFloorCoordinates';
import { IWarehousePoint } from '../../../../store/form/task/array/type';
import { IFloor } from '../../../../store/map/type';
import { useRootStore } from '../../../../utils/RootStoreProvider/useRootStore';

interface IMapFloorProps extends IFloor {
  index: number;
}

const MapFloor: FC<IMapFloorProps> = observer(
  ({ id, active, number, index }) => {
    const { storeFormTaskArray, storeMap, storeFormState } = useRootStore();
    const floorNode = useRef<HTMLDivElement>(null);
    const getFloorCoordinates = useGetFloorCoordinates();
    const checkIsAdded = useCheckIsAdded();

    function chooseFloor() {
      if (floorNode.current && storeFormState.isSelectedMap) {
        const { zone, section, block, floor } = getFloorCoordinates(
          floorNode.current,
        );

        if (zone && section && block && floor) {
          if (
            checkIsAdded(
              storeFormTaskArray.getFormArrays(
                'warehousePoints',
              ) as IWarehousePoint[],
              floor.id,
              'floorId',
            )
          ) {
            storeMap.setFloorActive(
              zone.index,
              section.index,
              block.index,
              floor.index,
              false,
            );
            storeFormTaskArray.removeFormArrays('warehousePoints', floor.id);
          } else {
            storeMap.setFloorActive(
              zone.index,
              section.index,
              block.index,
              floor.index,
              true,
            );
            storeFormTaskArray.addFormArrays('warehousePoints', {
              zoneId: zone.id,
              sectionId: section.id,
              blockId: block.id,
              floorId: floor.id,
            });
          }
        }
      }
    }

    return (
      <div
        ref={floorNode}
        className='map-block__floor'
        data-floor-id={id}
        data-floor-index={index}
        style={{
          gridRow: `${-number}/${-number - 1}`,
          backgroundColor:
            active && storeFormState.isSelectedMap ? '#c15943' : '',
        }}
        onClick={chooseFloor}
      />
    );
  },
);

export default MapFloor;
