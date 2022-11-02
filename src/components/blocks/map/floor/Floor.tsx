import { observer } from 'mobx-react-lite';
import { FC, useRef } from 'react';
import useCheckIsAdded from '../../../../hooks/map/useCheckIsAdded/useCheckIsAdded';
import useGetFloorCoordinates from '../../../../hooks/map/useGetFloorCoordinates/useGetFloorCoordinates';
import { useRootStore } from '../../../../utils/RootStoreProvider/useRootStore';
import { IFloorProps } from './type';

const Floor: FC<IFloorProps> = observer(({ id, active, number, index }) => {
  const { addTaskFormStore, mapStore } = useRootStore();
  const floorNode = useRef<HTMLDivElement>(null);
  const getFloorCoordinates = useGetFloorCoordinates();
  const checkIsAdded = useCheckIsAdded();

  function chooseFloor() {
    if (floorNode.current && mapStore.isSelectedMap) {
      const { zone, section, block, floor } = getFloorCoordinates(
        floorNode.current,
      );

      if (zone && section && block && floor) {
        if (
          checkIsAdded(addTaskFormStore.warehousePoints, floor.id, 'floorId')
        ) {
          mapStore.setFloorActive(
            zone.index,
            section.index,
            block.index,
            floor.index,
            false,
          );
          addTaskFormStore.removeWarehousePoint(floor.id);
        } else {
          mapStore.setFloorActive(
            zone.index,
            section.index,
            block.index,
            floor.index,
            true,
          );
          addTaskFormStore.addWarehousePoint({
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
        backgroundColor: active && mapStore.isSelectedMap ? '#c15943' : '',
      }}
      onClick={chooseFloor}
    />
  );
});

export default Floor;
