import { observer } from 'mobx-react-lite';
import { FC, MouseEvent } from 'react';
import { IFloor } from '../../../../store/map/type';

const Floor: FC<IFloor> = observer(({ id, number }) => {
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
	}

	return (
		<div
			className={'map__floor'}
			data-floor-id={id}
			style={{ gridRow: `${-number}/${-number - 1}` }}
			onClick={(e) => sayFloorPosition(e)}
		></div>
	);
});

export default Floor;
