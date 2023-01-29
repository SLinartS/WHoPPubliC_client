import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { IFloor } from '@store/map/type';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { useGetFloorClasses } from '../hooks/useGetFloorClasses';
import { useGetFloorStyles } from '../hooks/useGetFloorStyles';

interface IMapFloorProps extends IFloor {
  index: number;
}

const MapFloor: FC<IMapFloorProps> = ({
  id,
  number,
  capacity,
  freeSpace,
  reservedSpace,
  index,
}) => {
  const { storePopup } = useRootStore();
  const floorStyles = useGetFloorStyles(
    id,
    number,
    capacity,
    freeSpace,
    reservedSpace,
  );
  const floorClasses = useGetFloorClasses(id);

  function chooseFloor() {
    if (storePopup.form.state.isSelectedMap) {
      const floorIsAlreadyAdded = storePopup.select.floors.checkIsAdded(id);

      if (floorIsAlreadyAdded) {
        storePopup.select.floors.removeItem(id);
      } else {
        storePopup.select.floors.addItem(id);
      }
    }
  }

  return (
    <div
      className={`map-block__floor ${floorClasses}`}
      data-floor-id={id}
      data-floor-index={index}
      data-floor-free-space={freeSpace}
      data-floor-reserved-space={reservedSpace}
      style={floorStyles}
      onClick={chooseFloor}
    />
  );
};

export default observer(MapFloor);
