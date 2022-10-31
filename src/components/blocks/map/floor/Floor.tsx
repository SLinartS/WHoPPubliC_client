import { observer } from 'mobx-react-lite';
import { FC, useEffect, useRef, useState } from 'react';
import useCheckIsAdded from '../../../../hooks/map/useCheckIsAdded/useCheckIsAdded';
import useGetFloorCoordinates from '../../../../hooks/map/useGetFloorCoordinates/useGetFloorCoordinates';
import { useRootStore } from '../../../../utils/RootStoreProvider/useRootStore';
import { IFloorProps } from './type';

const Floor: FC<IFloorProps> = observer(({ id, active, number, index }) => {
  const [isSelectedMapStatus, setIsSelectedMap] = useState<boolean>(false);

  const { addTaskFormStore, mapStore } = useRootStore();
  const floorNode = useRef<HTMLDivElement>(null);
  const getFloorCoordinates = useGetFloorCoordinates();
  const checkIsAdded = useCheckIsAdded();

  function chooseFloor() {
    console.log(floorNode.current, isSelectedMapStatus);
    if (floorNode.current && isSelectedMapStatus) {
      const { zone, section, block, floor } = getFloorCoordinates(
        floorNode.current,
      );

      if (zone && section && block && floor) {
        if (checkIsAdded(floor.id)) {
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

  useEffect(() => {
    console.log('SDFAS', mapStore.isSelectedMap);
    if (mapStore.isSelectedMap) {
      setIsSelectedMap(true);
    } else {
      setIsSelectedMap(false);
    }
  }, [mapStore.isSelectedMap]);

  return (
    <div
      ref={floorNode}
      className='map-block__floor'
      data-floor-id={id}
      data-floor-index={index}
      style={{
        gridRow: `${-number}/${-number - 1}`,
        backgroundColor: active && isSelectedMapStatus ? '#c15943' : '',
      }}
      onClick={chooseFloor}
    />
  );
});

export default Floor;
