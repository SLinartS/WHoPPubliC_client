import { observer } from 'mobx-react-lite';
import { FC, MouseEvent, useCallback, useEffect, useState } from 'react';
import { IWarehousePoint } from '../../../../store/form/type';
import { IFloor } from '../../../../store/map/type';
import { useRootStore } from '../../../../utils/RootStoreProvider/useRootStore';

const initialFloorPosition: IWarehousePoint = {
  zoneId: '0',
  sectionId: '0',
  blockId: '0',
  floorId: '0',
};

const Floor: FC<IFloor> = observer(({ id, number }) => {
  const [floorAdded, setFloorAdded] = useState<boolean>(false);
  const [floorPosition, setFloorPosition] =
    useState<IWarehousePoint>(initialFloorPosition);

  const { addTaskFormStore } = useRootStore();

  const checkFloorAdded = useCallback(() => {
    for (const warehousePoint of addTaskFormStore.warehousePoints) {
      console.log(warehousePoint.floorId);
      console.log(addTaskFormStore.warehousePoints);
      if (warehousePoint.floorId === floorPosition.floorId) {
        console.log(warehousePoint.floorId, '=', floorPosition.floorId);
        return true;
      }
    }
    return false;
  }, [addTaskFormStore.warehousePoints, floorPosition.floorId]);

  function sayFloorPosition(e: MouseEvent<HTMLDivElement>) {
    const { floorId } = (e.target as HTMLDivElement).dataset;

    const blockParent: HTMLDivElement = (e.target as HTMLDivElement)
      .parentNode as HTMLDivElement;
    const { blockId } = blockParent.dataset;

    const sectionParent: HTMLDivElement =
      blockParent.parentNode as HTMLDivElement;
    const { sectionId } = sectionParent.dataset;

    const zoneParent: HTMLDivElement =
      sectionParent.parentNode as HTMLDivElement;
    const { zoneId } = zoneParent.dataset;

    console.log(
      `zoneId: ${zoneId} | sectionId: ${sectionId} | blockId: ${blockId} | floorId: ${floorId}`,
    );

    if (zoneId && sectionId && blockId && floorId) {
      if (checkFloorAdded()) {
        addTaskFormStore.removeWarehousePoint(floorId);
        console.log('Check True');
      } else {
        console.log('Check False');
        setFloorPosition({
          zoneId,
          sectionId,
          blockId,
          floorId,
        });
        addTaskFormStore.addWarehousePoint({
          zoneId,
          sectionId,
          blockId,
          floorId,
        });
      }
    }
  }

  useEffect(() => {
    if (checkFloorAdded()) {
      setFloorAdded(true);
    } else {
      setFloorAdded(false);
    }
  }, [checkFloorAdded]);

  return (
    <div
      className='map__floor'
      data-floor-id={id}
      style={{
        gridRow: `${-number}/${-number - 1}`,
        backgroundColor: floorAdded ? 'red' : '',
      }}
      onClick={(e) => sayFloorPosition(e)}
    />
  );
});

export default Floor;
