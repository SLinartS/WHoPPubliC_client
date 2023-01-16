import { observer } from 'mobx-react-lite';
import { FC, useCallback, useEffect, useState } from 'react';

import { IFloor } from '../../../../store/map/type';
import { useRootStore } from '../../../../utils/RootStoreProvider/useRootStore';

interface IMapFloorProps extends IFloor {
  index: number;
}

interface IMapFloorStyles {
  [key: string]: string;
}

const MapFloor: FC<IMapFloorProps> = observer(
  ({ id, number, capacity, freeSpace, index }) => {
    const { storePopup } = useRootStore();
    const [styles, setStyles] = useState<IMapFloorStyles>();

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

    const checkIsAdded = useCallback(() => {
      return storePopup.select.floors.checkIsAdded(id);
    }, [storePopup.select.floors.arrayValue.length]);

    useEffect(() => {
      const newStyle = {
        gridRow: `${-number}/${-number - 1}`,
        background: 'unset',
        animation: 'none',
      };
      if (storePopup.view.product.getFloorIds().includes(id)) {
        newStyle.animation =
          'locationFloor 1000ms linear 0s infinite normal forwards';
      }
      if (checkIsAdded()) {
        newStyle.background = `linear-gradient(180deg, 
            #e7731f ${(freeSpace / capacity) * 100}%, 
            #59468B ${(freeSpace / capacity) * 100}%)`;
      } else {
        newStyle.background = `linear-gradient(180deg, 
            transparent ${(freeSpace / capacity) * 100}%, 
            #59468B ${(freeSpace / capacity) * 100}%)`;
      }

      setStyles(newStyle);
    }, [number, freeSpace, capacity, checkIsAdded]);

    return (
      <div
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
