import { observer } from 'mobx-react-lite';
import { FC, MouseEvent, useCallback, useEffect, useState } from 'react';
import { IWarehousePoint } from '../../../../store/form/type';
import { IFloor } from '../../../../store/map/type';
import { useRootStore } from '../../../../utils/RootStoreProvider/useRootStore';

const initialFloorPosition: IWarehousePoint = {
	zoneId: '0',
	sectionId: '0',
	blockId: '0',
	floorId: '0',
};

const Floor: FC<IFloor> = observer(({ id, number }) => {
	const [floorAdded, setFloorAdded] = useState<boolean>(false);
	const [floorPosition, setFloorPosition] = useState<IWarehousePoint>(initialFloorPosition);

	const { addTaskFormStore } = useRootStore();

	function sayFloorPosition(e: MouseEvent<HTMLDivElement>) {
		let floorId: string | undefined = (e.target as HTMLDivElement).dataset.floorId;

		let blockParent: HTMLDivElement = (e.target as HTMLDivElement).parentNode as HTMLDivElement;
		let blockId: string | undefined = blockParent.dataset.blockId;

		let sectionParent: HTMLDivElement = blockParent.parentNode as HTMLDivElement;
		let sectionId: string | undefined = sectionParent.dataset.sectionId;

		let zoneParent: HTMLDivElement = sectionParent.parentNode as HTMLDivElement;
		let zoneId: string | undefined = zoneParent.dataset.zoneId;

		console.log(
			`zoneId: ${zoneId} | sectionId: ${sectionId} | blockId: ${blockId} | floorId: ${floorId}`,
		);

		if (zoneId && sectionId && blockId && floorId) {
			if (checkFloorAdded()) {
				addTaskFormStore.removeWarehousePoint(floorId);
			} else {
				setFloorPosition({
					zoneId: zoneId,
					sectionId: sectionId,
					blockId: blockId,
					floorId: floorId,
				});
				addTaskFormStore.addWarehousePoint({
					zoneId: zoneId,
					sectionId: sectionId,
					blockId: blockId,
					floorId: floorId,
				});
			}
		} else {
			alert('Отсутствует информация об одном из родительских контейнеров');
		}
	}

	const checkFloorAdded = useCallback(() => {
		for (let warehousePoint of addTaskFormStore.warehousePoints) {
			if (warehousePoint.floorId === floorPosition.floorId) {
				return true;
			}
		}
		return false;
	}, [addTaskFormStore.warehousePoints, floorPosition.floorId]);

	useEffect(() => {
		if (checkFloorAdded()) {
			setFloorAdded(true);
		} else {
			setFloorAdded(false);
		}
	}, [checkFloorAdded]);

	return (
		<div
			className={'map__floor'}
			data-floor-id={id}
			style={{
				gridRow: `${-number}/${-number - 1}`,
				backgroundColor: floorAdded ? 'red' : '',
			}}
			onClick={(e) => sayFloorPosition(e)}
		></div>
	);
});

export default Floor;
