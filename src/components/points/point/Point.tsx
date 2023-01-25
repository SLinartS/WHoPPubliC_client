import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { TPointType } from '@store/type';
import { observer } from 'mobx-react-lite';
import { FC, useMemo } from 'react';

interface IPointProps {
  id: number;
  text: string;
  index: number;
  pointsType: TPointType;
}

const Point: FC<IPointProps> = ({ id, text, index, pointsType }) => {
  const { storePopup, storeProduct } = useRootStore();

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
  const checkIsAdded = useMemo(() => {
    return storePopup.select.points.checkIsAdded(id);
  }, [storePopup.select.points.values.length]);

  const styles = useMemo(() => {
    const newStyle = {
      background: '#eaeaea',
    };
    if (checkIsAdded) {
      newStyle.background = `#c15943`;
    } else {
      newStyle.background = `#eaeaea`;
    }
    return newStyle;
  }, [checkIsAdded]);

  const classes = useMemo(() => {
    let newClasses = '';
    if (storeProduct.state.product.serviceInformation.pointIds.includes(id)) {
      if (pointsType === 'acceptance') {
        newClasses += 'points-map__point--animation-current';
      } else {
        newClasses += 'points-map__point--animation-future';
      }
    }
    return newClasses;
  }, [storeProduct.state.product.serviceInformation.pointIds]);

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
