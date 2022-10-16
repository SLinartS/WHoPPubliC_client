import React, { FC, ReactNode } from 'react';
import { ITasks } from '../../../../types/tasks';
import TableHeader from './TableHeader';
import TableRow from './TableRow';

const Table: FC<ITasks> = ({ tasks }) => {
	function generateRows() {
		let rows: Array<ReactNode> = [];
    
		for (let i: number = 0; i < tasks.length; i++) {
			let task = tasks[i];
			rows.push(
				<TableRow
					key={task.id}
					number={i + 1}
					id={task.id}
					deadlines={task.deadlines}
					dateStart={task.dateStart}
					dateEnd={task.dateEnd}
					operatorLogin={task.operatorLogin}
				/>,
			);
		}
		return rows;
	}

	return (
		<div className='table table--map'>
			<TableHeader />
			{generateRows()}
		</div>
	);
};

export default Table;
