import { observer } from 'mobx-react-lite';
import { FC, useCallback, useEffect, useState } from 'react';

import { useRootStore } from '../../../../utils/RootStoreProvider/useRootStore';

interface IPointProps {
  id: number;
}

interface IBlockPointStyles {
  [key: string]: string;
}

const Point: FC<IPointProps> = observer(({ id }) => {
  const { storePopup } = useRootStore();
  const [styles, setStyles] = useState<IBlockPointStyles>();

  function choosePointBlock() {
    if (storePopup.form.state.isSelectedPoint) {
      const pointIsAlreadyAdded = storePopup.select.points.checkIsAdded(id);

      if (storePopup.form.state.isInProductForm) {
        storePopup.select.points.clear();
        storePopup.select.points.addItem(id);
        storePopup.status.hide('selectPoints');
        storePopup.form.state.isInProductForm = false;
        return;
      }

      if (pointIsAlreadyAdded) {
        storePopup.select.points.removeItem(id);
      } else {
        storePopup.select.points.addItem(id);
      }
    }
  }
  const checkIsAdded = useCallback(() => {
    return storePopup.select.points.checkIsAdded(id);
  }, [storePopup.select.points.values.length]);

  useEffect(() => {
    const newStyle = {
      background: '#eaeaea',
      animation: 'none',
    };
    if (checkIsAdded()) {
      newStyle.background = `#c15943`;
    } else {
      newStyle.background = `#eaeaea`;
    }
    if (storePopup.view.product.getPointId() === id) {
      newStyle.animation =
        'location-point 1000ms linear 0s infinite normal forwards';
    }
    setStyles(newStyle);
  }, [checkIsAdded]);

  return (
    <div
      className='points-map__point'
      onClick={choosePointBlock}
      style={styles}
    />
  );
});

export default Point;
