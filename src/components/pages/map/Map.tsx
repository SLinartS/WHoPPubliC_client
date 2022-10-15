import React, { FC, useState } from 'react';
import Table from './Table';
import { IMapTable } from '../../../types/map';

const testInitialData: Array<IMapTable> = [
	{
		columnsNumber: 4,
		zoneLetter: 'A',
		rows: [
			{ isHeadRow: true, number: 0 },
			{ isHeadRow: false, number: 1 },
			{ isHeadRow: false, number: 2 },
			{ isHeadRow: false, number: 3 },
			{ isHeadRow: false, number: 4 },
			{ isHeadRow: false, number: 5 },
			{ isHeadRow: false, number: 6 },
			{ isHeadRow: false, number: 7 },
			{ isHeadRow: false, number: 8 },
			{ isHeadRow: false, number: 9 },
		],
	},
	{
		columnsNumber: 5,
		zoneLetter: 'B',
		rows: [
			{ isHeadRow: true, number: 0 },
			{ isHeadRow: false, number: 1 },
			{ isHeadRow: false, number: 2 },
			{ isHeadRow: false, number: 3 },
		],
	},
];

const Map: FC = () => {
	const [tableData, setTableData] = useState<Array<IMapTable>>(testInitialData);

	return (
		<main className='map'>
			<div className='map__container'>
				{tableData.map((table) => {
					return (
						<Table
							key={table.zoneLetter}
							columnsNumber={table.columnsNumber}
							zoneLetter={table.zoneLetter}
							rows={table.rows}
						/>
					);
				})}
			</div>
		</main>
	);
};

export default Map;
