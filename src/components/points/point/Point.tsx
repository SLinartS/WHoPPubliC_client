import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { TPointType } from '@store/type';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { useGetPointClasses } from '../hooks/useGetPointClasses';
import { useGetPointStyles } from '../hooks/useGetPointStyles';

interface IPointProps {
  id: number;
  text: string;
  index: number;
  pointsType: TPointType;
}

const Point: FC<IPointProps> = ({ id, text, index, pointsType }) => {
  const { storePopup } = useRootStore();
  const styles = useGetPointStyles(id);
  const classes = useGetPointClasses(id, pointsType);

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

  return (
    <div
      className='points-map__points-block'
      data-point-id={id}
      data-point-index={index}
    >
      <div
        className={`points-map__point ${classes}`}
        onClick={choosePointBlock}
        style={styles}
      />
      <p className='points-map__title'>{text}</p>
    </div>
  );
};

export default observer(Point);
