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
					columnsNumber: 15,
					rows: [
						{ id: 0, isHeadRow: true, number: 0 },
						{ id: 1, isHeadRow: false, number: 1 },
						{ id: 2, isHeadRow: false, number: 2 },
						{ id: 3, isHeadRow: false, number: 3 },
						{ id: 4, isHeadRow: false, number: 4 },
						{ id: 5, isHeadRow: false, number: 5 },
						{ id: 6, isHeadRow: false, number: 6 },
						{ id: 7, isHeadRow: false, number: 7 },
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
					columnsNumber: 4,
					rows: [
						{ id: 0, isHeadRow: true, number: 0 },
						{ id: 1, isHeadRow: false, number: 1 },
						{ id: 2, isHeadRow: false, number: 2 },
						{ id: 3, isHeadRow: false, number: 3 },
					],
				},
				{
					id: 1,
					columnsNumber: 10,
					rows: [
						{ id: 0, isHeadRow: true, number: 0 },
						{ id: 1, isHeadRow: false, number: 1 },
						{ id: 2, isHeadRow: false, number: 2 },
						{ id: 3, isHeadRow: false, number: 3 },
						{ id: 4, isHeadRow: false, number: 4 },
						{ id: 5, isHeadRow: false, number: 5 },
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
