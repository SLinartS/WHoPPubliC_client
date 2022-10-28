import { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import './style.scss';

import { useRootStore } from '../../../utils/RootStoreProvider/useRootStore';
import Zone from './zone/Zone';
import { IMapProps } from './type';

const Map: FC<IMapProps> = observer(({additionalClasses}) => {
	const { mapStore } = useRootStore();

	useEffect(() => {
		if (mapStore.status === 'pending') {
			mapStore.getMap();
		}
	}, [mapStore.status]);

	return (
		<main className={'map ' + additionalClasses }>
			<div className='map__container'>
				{mapStore.mapData.map((zone) => {
					return (
						<Zone
							key={zone.id}
							id={zone.id}
							number={zone.number}
							zoneLetter={zone.zoneLetter}
							sections={zone.sections}
						/>
					);
				})}
			</div>
		</main>
	);
});

export default Map;
