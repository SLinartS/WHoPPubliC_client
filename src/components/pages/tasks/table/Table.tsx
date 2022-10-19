import { observer } from 'mobx-react-lite';
import { FC, ReactNode } from 'react';
import { ITableProps } from '../../../../types/elements/table';
import TableHeaderColumn from './TableHeaderColumn';
import TableRow from './TableRow';

const Table: FC<ITableProps> = observer(({ dataList }) => {
	function generateRows(): Array<ReactNode> {
		let rows: Array<ReactNode> = [];
		for (let i: number = 0; i < dataList.length; i++) {
			let columns = dataList[i];
			rows.push(<TableRow key={columns.id} number={i + 1} columns={columns} />);
		}
		return rows;
	}

	const TABLE_HEADER_COLUMNS = [
		'№',
		'ID',
		'Осталось времени',
		'Дата начала',
		'Дата окончания',
		'Логин оператора',
	];

	return (
		<div className='table table--map'>
			{TABLE_HEADER_COLUMNS.map((stroke) => (
				<TableHeaderColumn stroke={stroke} />
			))}
			{generateRows()}
		</div>
	);
});

export default Table;
