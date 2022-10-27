import { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';


import { useRootStore } from '../../../utils/RootStoreProvider/useRootStore';
import Zone from './zone/Zone';

const Map: FC = observer(() => {
	const { mapStore } = useRootStore();

	useEffect(() => {
		if (mapStore.status === 'pending') {
			mapStore.getMap();
		}
	}, [mapStore.status]);

	return (
		<main className='map'>
			<div className='map__container'>
				{mapStore.mapData.map((zone) => {
					return (
						<Zone
							key={zone.id}
							id={zone.id}
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
