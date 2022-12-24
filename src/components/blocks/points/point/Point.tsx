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
      storePopup.status.hideSelectPoints(() => {
        const pointIsAlreadyAdded = storePopup.select.points.checkIsAdded(id);
        if (!pointIsAlreadyAdded) {
          storePopup.select.points.clearArray();

          storePopup.select.points.addItem(id);
        }
        storePopup.status.showProductForm();
      });
    }
  }

  const checkIsAdded = useCallback(() => {
    return storePopup.select.points.checkIsAdded(id);
  }, [storePopup.select.points.arrayValue.length]);

  useEffect(() => {
    const newStyle = {
      background: 'transparent',
    };
    if (checkIsAdded()) {
      newStyle.background = `#c15943`;
    } else {
      newStyle.background = `transparent`;
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
