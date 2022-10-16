import React, { FC } from 'react';
import { IMap } from '../../../types/map';
import Zone from './Zone';

const testInitialData: IMap = {
	zones: [
		{
			id: 0,
			zoneLetter: 'A',
			sections: [
				{
					id: 0,
					floorsNumber: 7,
					blocks: [
						{ id: 1 },
						{ id: 2 },
						{ id: 3 },
						{ id: 4 },
						{ id: 5 },
						{ id: 6 },
						{ id: 7 },
					],
				},
			],
		},
		{
			id: 1,
			zoneLetter: 'C',
			sections: [
				{
					id: 0,
					floorsNumber: 5,
					blocks: [
						{ id: 1 },
						{ id: 2 },
						{ id: 3 },
						{ id: 4 },
					],
				},
				{
					id: 1,
					floorsNumber: 5,
					blocks: [
						{ id: 1 },
						{ id: 2 },
						{ id: 3 },
						{ id: 4 },
						{ id: 5 },
						{ id: 6 },
						{ id: 7 },
						{ id: 8 },
					],
				},
			],
		},
	],
};

const Map: FC = () => {
	return (
		<main className='map'>
			<div className='map__container'>
				{testInitialData.zones.map((zone) => {
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
};

export default Map;
