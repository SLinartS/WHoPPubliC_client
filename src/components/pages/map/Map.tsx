import React, { FC, useState } from 'react';
import Table from './Table';
import { IMapTableData } from '../../../types/map';

const testInitialData: Array<IMapTableData> = [
	{
		zoneLetter: 'A',
		rows: [
			{ isHeadRow: true, number: 0, columnsNumber: 4 },
			{ isHeadRow: false, number: 1, columnsNumber: 4 },
			{ isHeadRow: false, number: 2, columnsNumber: 4 },
			{ isHeadRow: false, number: 3, columnsNumber: 4 },
			{ isHeadRow: false, number: 4, columnsNumber: 4 },
			{ isHeadRow: false, number: 5, columnsNumber: 4 },
			{ isHeadRow: false, number: 6, columnsNumber: 4 },
			{ isHeadRow: false, number: 7, columnsNumber: 4 },
			{ isHeadRow: false, number: 8, columnsNumber: 4 },
			{ isHeadRow: false, number: 9, columnsNumber: 4 },
		],
	},
	{
		zoneLetter: 'B',
		rows: [
			{ isHeadRow: true, number: 0, columnsNumber: 5 },
			{ isHeadRow: false, number: 1, columnsNumber: 5 },
			{ isHeadRow: false, number: 2, columnsNumber: 5 },
			{ isHeadRow: false, number: 3, columnsNumber: 5 },
		],
	},
];

const Map: FC = () => {
	const [tableData, setTableData] = useState<Array<IMapTableData>>(testInitialData);

	return (
		<main className='map'>
			<div className='map__container'>
				{tableData.map((table) => {
					return (
						<Table
							key={table.zoneLetter}
							rows={table.rows}
							zoneLetter={table.zoneLetter}
						/>
					);
				})}
			</div>
		</main>
	);
};

export default Map;
