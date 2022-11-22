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
    const { storeForm, storePoint, storePopup } = useRootStore();
    const pointBlockNode = useRef<HTMLDivElement>(null);
    const getPointCoordinates = useGetPointCoordinates();
    const checkIsAdded = useCheckIsAdded();

    function choosePointBlock() {
      if (pointBlockNode.current && storeForm.state.isSelectedPoint) {
        const { point } = getPointCoordinates(pointBlockNode.current);

        storePopup.hideSelectPoints(() => {
          if (point) {
            const pointIsAlreadyAdded = checkIsAdded(
              storeForm.product.array.getFormArrays('points') as number[],
              point.id,
            );
            if (!pointIsAlreadyAdded) {
              storeForm.product.array.clearArrays('points');
              storePoint.utils.setAllPointsUnactive();

              storeForm.product.array.addFormArrays('points', point.id);
              storePoint.utils.setPointActive(
                storeForm.state.currentTaskType,
                point.index,
                true,
              );
            }
          }
          storePopup.showProductForm();
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
