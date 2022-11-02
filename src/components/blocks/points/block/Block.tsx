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
    const { storeTaskForm, storePoint } = useRootStore();
    const pointBlockNode = useRef<HTMLDivElement>(null);
    const getPointCoordinates = useGetPointCoordinates();
    const checkIsAdded = useCheckIsAdded();

    function choosePointBlock() {
      if (pointBlockNode.current && storePoint.isSelectedPoint) {
        const { point } = getPointCoordinates(pointBlockNode.current);

        if (point) {
          if (checkIsAdded(storeTaskForm.points, point.id)) {
            storePoint.setPointActive(
              storeTaskForm.currentTaskType,
              point.index,
              false,
            );
            storeTaskForm.removePoint(point.id);
          } else {
            storePoint.setPointActive(
              storeTaskForm.currentTaskType,
              point.index,
              true,
            );
            storeTaskForm.addPoint(point.id);
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
