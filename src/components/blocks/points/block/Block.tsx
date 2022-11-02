import { observer } from 'mobx-react-lite';
import { FC, useRef } from 'react';
import useCheckIsAdded from '../../../../hooks/map/useCheckIsAdded/useCheckIsAdded';
import useGetPointCoordinates from '../../../../hooks/map/useGetPointCoordinates/useGetPointCoordinates';
import { useRootStore } from '../../../../utils/RootStoreProvider/useRootStore';
import Point from '../point/Point';
import { IPointsBlockProps } from './type';

const PointsBlock: FC<IPointsBlockProps> = observer(
  ({ id, text, index, active }) => {
    const { addTaskFormStore, pointStore } = useRootStore();
    const pointBlockNode = useRef<HTMLDivElement>(null);
    const getPointCoordinates = useGetPointCoordinates();
    const checkIsAdded = useCheckIsAdded();

    function choosePointBlock() {
      if (pointBlockNode.current && pointStore.isSelectedPoint) {
        const { point } = getPointCoordinates(pointBlockNode.current);

        if (point) {
          if (checkIsAdded(addTaskFormStore.points, point.id)) {
            pointStore.setPointActive(
              addTaskFormStore.currentTaskType,
              point.index,
              false,
            );
            addTaskFormStore.removePoint(point.id);
          } else {
            pointStore.setPointActive(
              addTaskFormStore.currentTaskType,
              point.index,
              true,
            );
            addTaskFormStore.addPoint(point.id);
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
