import { observer } from 'mobx-react-lite';
import { FC, ReactNode } from 'react';
import { ITableProps } from '../../../types/blocks/table';
import TableHeaderColumn from './TableHeaderColumn';
import TableRow from './TableRow';

const Table: FC<ITableProps> = observer(({ data, tableHeader, classes }) => {
	function generateRows(): Array<ReactNode> {
		let rows: Array<ReactNode> = [];
		for (let i: number = 0; i < data.length; i++) {
			let columns = data[i];
			rows.push(<TableRow key={columns.id} columns={columns} />);
		}
		return rows;
	}

	return (
		<div
			className={'table ' + classes}
			style={{ gridTemplateColumns: `repeat(${tableHeader.length}, auto)` }}
		>
			{tableHeader.map((text) => (
				<TableHeaderColumn key={text} text={text} />
			))}
			{generateRows()}
		</div>
	);
});

export default Table;
