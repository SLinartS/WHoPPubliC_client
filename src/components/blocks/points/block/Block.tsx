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
    const { storeFormTaskArray, storeFormState, storePoint } = useRootStore();
    const pointBlockNode = useRef<HTMLDivElement>(null);
    const getPointCoordinates = useGetPointCoordinates();
    const checkIsAdded = useCheckIsAdded();

    function choosePointBlock() {
      if (pointBlockNode.current && storeFormState.isSelectedPoint) {
        const { point } = getPointCoordinates(pointBlockNode.current);

        if (point) {
          if (
            checkIsAdded(
              storeFormTaskArray.getFormArrays('points') as number[],
              point.id,
            )
          ) {
            storePoint.setPointActive(
              storeFormState.currentTaskType,
              point.index,
              false,
            );
            storeFormTaskArray.removeFormArrays('points', point.id);
          } else {
            storePoint.setPointActive(
              storeFormState.currentTaskType,
              point.index,
              true,
            );
            storeFormTaskArray.addFormArrays('points', point.id);
          }
        }
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
