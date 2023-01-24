import { observer } from 'mobx-react-lite';
import { FC, useMemo } from 'react';

import { IFloor } from '../../../../store/map/type';
import { useRootStore } from '../../../../utils/RootStoreProvider/useRootStore';
import { useCheckCurrentOrFutureFloor } from '../hooks/useCheckCurrentOrFutureFloor';

interface IMapFloorProps extends IFloor {
  index: number;
}

const MapFloor: FC<IMapFloorProps> = observer(
  ({ id, number, capacity, freeSpace, reservedSpace, index }) => {
    const { storePopup } = useRootStore();
    const checkCurrentOrFutureFloorhook = useCheckCurrentOrFutureFloor();

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

    const checkIsAdded = useMemo(() => {
      return storePopup.select.floors.checkIsAdded(id);
    }, [storePopup.select.floors.values.length]);

    const styles = useMemo(() => {
      const newStyle = {
        gridRow: `${-number}/${-number - 1}`,
        background: 'unset',
      };
      const freeSpacePercent = (freeSpace / capacity) * 100;
      const reservedSpacePercent =
        (freeSpace / capacity + reservedSpace / capacity) * 100;

      if (checkIsAdded) {
        newStyle.background = `linear-gradient(180deg, 
            #e7731f ${freeSpacePercent}%, 
            #7f8dcf ${freeSpacePercent}%, 
            #7f8dcf ${reservedSpacePercent}%, 
            #59468B ${reservedSpacePercent}%, 
            #59468B ${100}%)`;
      } else {
        newStyle.background = `linear-gradient(180deg, 
            transparent ${freeSpacePercent}%,
            #7f8dcf ${freeSpacePercent}%, 
            #7f8dcf ${reservedSpacePercent}%, 
            #59468B ${reservedSpacePercent}%, 
            #59468B ${100}%)`;
      }
      return newStyle;
    }, [number, freeSpace, capacity, checkIsAdded]);

    const classes = useMemo(() => {
      let newClasses = '';
      const checkResult = checkCurrentOrFutureFloorhook(id);
      if (checkResult.result) {
        newClasses += `map-block__floor--animation-${checkResult.type}`;
      }
      return newClasses;
    }, []);

    return (
      <div
        className={`map-block__floor ${classes}`}
        data-floor-id={id}
        data-floor-index={index}
        data-floor-free-space={freeSpace}
        data-floor-reserved-space={reservedSpace}
        style={styles}
        onClick={chooseFloor}
      />
    );
  },
);

export default MapFloor;
