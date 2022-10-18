import { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import Table from './table/Table';

import { useRootStore } from '../../../utils/RootStoreProvider/useRootStore';

const Tasks: FC = observer(() => {
	const { tasksStore } = useRootStore();

	useEffect(() => {
		if (tasksStore.status === 'pending') {
			tasksStore.getAcceptanceTasks();
			tasksStore.getShipmentTasks();
		}
	}, [tasksStore.status]);

	return (
		<main className='tasks'>
			<div className='tasks__title'>
				<h3 className='tasks__title-text'>Приёмка</h3>
			</div>
			<div className='tasks__block'>
				<button className='tasks__add-task'>Добавить</button>
				{tasksStore.status === 'done' ? (
					<Table key={Math.random()} tasks={tasksStore.tasksAccepranceList} />
				) : (
					''
				)}
			</div>
			<div className='tasks__title tasks__title--shipment'>
				<h3 className='tasks__title-text tasks__title-text'>Отгрузка</h3>
			</div>
			<div className='tasks__block'>
				<button className='tasks__add-task'>Добавить</button>
				{tasksStore.status === 'done' ? (
					<Table key={Math.random()} tasks={tasksStore.tasksShipmentList} />
				) : (
					''
				)}
			</div>
		</main>
	);
});

export default Tasks;
