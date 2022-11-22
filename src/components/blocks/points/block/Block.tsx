import { observer } from 'mobx-react-lite';
import { FC, useRef } from 'react';

import useCheckIsAdded from '../../../../hooks/mapAndPoint/useCheckIsAdded';
import useGetPointCoordinates from '../../../../hooks/mapAndPoint/useGetPointCoordinates';
import { useRootStore } from '../../../../utils/RootStoreProvider/useRootStore';
import Point from '../point/Point';

interface IPointsBlockProps {
  id: number;
  text: string;
  index: number;
  active: boolean;
}

const PointsBlock: FC<IPointsBlockProps> = observer(
  ({ id, text, index, active }) => {
    const { storePoint, storePopup } = useRootStore();
    const pointBlockNode = useRef<HTMLDivElement>(null);
    const getPointCoordinates = useGetPointCoordinates();
    const checkIsAdded = useCheckIsAdded();

    function choosePointBlock() {
      if (pointBlockNode.current && storePopup.form.state.isSelectedPoint) {
        const { point } = getPointCoordinates(pointBlockNode.current);

        storePopup.status.hideSelectPoints(() => {
          if (point) {
            const pointIsAlreadyAdded = checkIsAdded(
              storePopup.select.points.arrayValue as number[],
              point.id,
            );
            if (!pointIsAlreadyAdded) {
              storePopup.select.points.clearArray();
              storePoint.utils.setAllPointsUnactive();

              storePopup.select.points.addItem(point.id);
              storePoint.utils.setPointActive(
                storePopup.form.state.currentTaskType,
                point.index,
                true,
              );
            }
          }
          storePopup.status.showProductForm();
        });
      }
    }

    return (
      <div
        ref={pointBlockNode}
        className='points-map__points-block'
        data-point-id={id}
        data-point-index={index}
        onClick={choosePointBlock}
      >
        <Point active={active} />
        <p className='points-map__title'>{text}</p>
      </div>
    );
  },
);

export default PointsBlock;
