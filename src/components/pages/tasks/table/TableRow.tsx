import React, { FC } from 'react';
import { ITaskComponent } from '../../../../types/tasks';

const TableRow: FC<ITaskComponent> = ({
	number,
	id,
	deadlines,
	dateStart,
	dateEnd,
	operatorLogin,
}) => {
	return (
		<>
			<div className='table__block table__block--row'>
				<p className='table__text'>{number}</p>
			</div>
			<div className='table__block table__block--row'>
				<p className='table__text table__text--id'>{id}</p>
			</div>
			<div className='table__block table__block--row'>
				<p className='table__text'>{deadlines}</p>
			</div>
			<div className='table__block table__block--row'>
				<p className='table__text'>{dateStart}</p>
			</div>
			<div className='table__block table__block--row'>
				<p className='table__text'>{dateEnd}</p>
			</div>
			<div className='table__block table__block--row'>
				<p className='table__text'>{operatorLogin}</p>
			</div>
		</>
	);
};

export default TableRow;
