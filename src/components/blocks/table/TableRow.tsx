import { observer } from 'mobx-react-lite';
import { FC, ReactNode } from 'react';
import { IRowProps } from '../../../types/blocks/table';
import TableColumn from './TableColumn';

const TableRow: FC<IRowProps> = observer(({ columns, number }) => {
	function generateColumns() {
		let columnsNode: Array<ReactNode> = [];

		for (let stroke of Object.values(columns)) {
			columnsNode.push(<TableColumn stroke={stroke} />);
		}

		return columnsNode;
	}

	return (
		<>
			<TableColumn stroke={number} />
			{generateColumns()}
		</>
	);
});

export default TableRow;
