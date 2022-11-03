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
    const { storeFormTask, storePoint } = useRootStore();
    const pointBlockNode = useRef<HTMLDivElement>(null);
    const getPointCoordinates = useGetPointCoordinates();
    const checkIsAdded = useCheckIsAdded();

    function choosePointBlock() {
      if (pointBlockNode.current && storePoint.isSelectedPoint) {
        const { point } = getPointCoordinates(pointBlockNode.current);

        if (point) {
          if (checkIsAdded(storeFormTask.points, point.id)) {
            storePoint.setPointActive(
              storeFormTask.currentTaskType,
              point.index,
              false,
            );
            storeFormTask.removePoint(point.id);
          } else {
            storePoint.setPointActive(
              storeFormTask.currentTaskType,
              point.index,
              true,
            );
            storeFormTask.addPoint(point.id);
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
