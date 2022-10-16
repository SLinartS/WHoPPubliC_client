import React, { FC } from 'react';
import { ITasksList } from '../../../types/tasks';
import Table from './table/Table';

const testInitialData: ITasksList = {
	acceptance: [
		{
			id: "A4264",
			deadlines: '6 дней',
			dateStart: '21.05.2021',
			dateEnd: '15.03.2022',
			operatorLogin: 'U8K9',
		},
		{
			id: "B7124",
			deadlines: '2 дней',
			dateStart: '21.06.2021',
			dateEnd: '15.08.2021',
			operatorLogin: 'Y3K9',
		},
		{
			id: "Y7543",
			deadlines: '10 дней',
			dateStart: '21.05.2021',
			dateEnd: '15.03.2022',
			operatorLogin: 'U8K9',
		},
    {
			id: "Y7646",
			deadlines: '10 дней',
			dateStart: '21.05.2021',
			dateEnd: '15.03.2022',
			operatorLogin: 'U8K9',
		},
    {
			id: "G6426",
			deadlines: '10 дней',
			dateStart: '21.05.2021',
			dateEnd: '15.03.2022',
			operatorLogin: 'U8K9',
		},
    {
			id: "E1242",
			deadlines: '10 дней',
			dateStart: '21.05.2021',
			dateEnd: '15.03.2022',
			operatorLogin: 'U8K9',
		},
	],
	shipments: [
		{
			id: "O8372",
			deadlines: '3 дней',
			dateStart: '11.09.2022',
			dateEnd: '01.10.2022',
			operatorLogin: 'U8K9',
		},
		{
			id: "P7832",
			deadlines: '1 дней',
			dateStart: '11.09.2022',
			dateEnd: '12.09.2022',
			operatorLogin: 'J1T4',
		},
	],
};

const Tasks: FC = () => {
	return (
		<main className='tasks'>
			<div className='tasks__title'>
				<h3 className='tasks__title-text'>Приёмка</h3>
			</div>
			<div className='tasks__block'>
				<button className='tasks__add-task'>Добавить</button>
				<Table key={Math.random()} tasks={testInitialData.acceptance}/>
			</div>
			<div className='tasks__title tasks__title--shipment'>
				<h3 className='tasks__title-text tasks__title-text'>Отгрузка</h3>
			</div>
			<div className='tasks__block'>
				<button className='tasks__add-task'>Добавить</button>
				<Table key={Math.random()} tasks={testInitialData.shipments}/>
			</div>
		</main>
	);
};

export default Tasks;
