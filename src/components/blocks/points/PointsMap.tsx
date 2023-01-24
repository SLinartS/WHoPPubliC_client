import { observer } from 'mobx-react-lite';
import { FC, ReactNode } from 'react';

import { TPointType } from '../../../store/type';
import { useRootStore } from '../../../utils/RootStoreProvider/useRootStore';
import Point from './point/Point';

interface IPointsMapProps {
  pointsType: TPointType;
  classes?: string;
}

const PointsMap: FC<IPointsMapProps> = observer(({ pointsType, classes }) => {
  const { storePoint } = useRootStore();
  function displayPointsByTaskType(): ReactNode {
    const PointNodes: ReactNode[] = [];

    let pointsArray = storePoint.state.points.acceptance;
    switch (pointsType) {
      case 'acceptance':
        pointsArray = storePoint.state.points.acceptance;
        break;
      case 'shipment':
        pointsArray = storePoint.state.points.shipment;
        break;
      default:
    }

    pointsArray.forEach((point, index) => {
      PointNodes.push(
        <Point
          key={point.id}
          id={point.id}
          text={point.title}
          index={index}
          pointsType={pointsType}
        />,
      );
    });

    return PointNodes;
  }

  return (
    <div className={`points-map ${classes}`}>
      <div className='points-map__container'>{displayPointsByTaskType()}</div>
    </div>
  );
});

export default PointsMap;
