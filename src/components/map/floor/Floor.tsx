import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { IFloor } from '@store/map/type';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { useMapProductOpenHandler } from '../hooks/mapProduct/useMapProductOpenHandler';
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
  productIds,
  isSearch,
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
  const openMapProductsHandler = useMapProductOpenHandler(productIds);

  function chooseFloor() {
    if (storePopup.form.state.isSelectedMap) {
      const floorIsAlreadyAdded = storePopup.select.floors.checkIsAdded(id);

      if (floorIsAlreadyAdded) {
        storePopup.select.floors.removeItem(id);
      } else {
        storePopup.select.floors.addItem(id);
      }
    } else if (freeSpace < capacity) {
      openMapProductsHandler();
    }
  }

  return (
    <div
      className={`map-block__floor ${floorClasses} ${
        freeSpace === capacity ? 'map-block__floor--empty' : ''
      }`}
      data-floor-id={id}
      data-floor-index={index}
      data-floor-free-space={freeSpace}
      data-floor-reserved-space={reservedSpace}
      style={floorStyles}
      onClick={chooseFloor}
    >
      <div
        className={`map-block__floor-link ${
          isSearch ? 'map-block__floor-link--active' : ''
        }`}
        onClick={openMapProductsHandler}
      />
    </div>
  );
};

export default observer(MapFloor);
